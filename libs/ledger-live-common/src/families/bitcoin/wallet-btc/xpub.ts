import { maxBy, range, some } from "lodash";
import BigNumber from "bignumber.js";
import { TX, Address, IStorage } from "./storage/types";
import { IExplorer } from "./explorer/types";
import { ICrypto } from "./crypto/types";
import { PickingStrategy } from "./pickingstrategies/types";
import { computeDustAmount, maxTxSizeCeil } from "./utils";
import { TransactionInfo, InputInfo, OutputInfo } from "./types";

// names inside this class and discovery logic respect BIP32 standard
class Xpub {
  storage: IStorage;

  explorer: IExplorer;

  crypto: ICrypto;

  xpub: string;

  derivationMode: string;

  freshAddress: string;

  freshAddressIndex: number;

  // https://github.com/bitcoinjs/bitcoinjs-lib/blob/27a840aac4a12338f1e40c54f3759bbd7a559944/src/bufferutils.js#L24
  // only works with number so we need to be sure to pass correct numbers
  OUTPUT_VALUE_MAX: number = Number.MAX_SAFE_INTEGER;

  GAP = 20;

  // when the difference between current blockheight and the blockheight in the storage is larger than this value, we ignore reorg
  nbBlockIgnoreReorg = 2000;

  // need to be bigger than the number of tx from the same address that can be in the same block
  txsSyncArraySize = 1000;

  constructor({
    storage,
    explorer,
    crypto,
    xpub,
    derivationMode,
  }: {
    storage: IStorage;
    explorer: IExplorer;
    crypto: ICrypto;
    xpub: string;
    derivationMode: string;
  }) {
    this.storage = storage;
    this.explorer = explorer;
    this.crypto = crypto;
    this.xpub = xpub;
    this.derivationMode = derivationMode;
    this.freshAddress = "";
    this.freshAddressIndex = 0;
  }

  async syncAddress(
    account: number,
    index: number,
    currentBlockHeight
  ): Promise<boolean> {
    const address = await this.crypto.getAddress(
      this.derivationMode,
      this.xpub,
      account,
      index
    );

    this.storage.addAddress(
      `${this.crypto.network.name}-${this.derivationMode}-${this.xpub}-${account}-${index}`,
      address
    );

    await this.checkAddressReorg(account, index, currentBlockHeight);

    // in case pendings have changed we clean them out
    const hasPendings = this.storage.hasPendingTx({
      account,
      index,
    });
    if (hasPendings) {
      this.storage.removePendingTxs({ account, index });
    }
    await this.fetchHydrateAndStoreNewTxs(address, account, index);
    const hasTx = this.storage.hasTx({
      account,
      index,
    });
    if (account === 0 && hasTx) {
      this.freshAddressIndex = Math.max(this.freshAddressIndex, index + 1);
    }

    return hasTx;
  }

  async checkAddressesBlock(
    account: number,
    index: number,
    currentBlockHeight: number
  ): Promise<boolean> {
    const addressesResults = await Promise.all(
      range(this.GAP).map((_, key) =>
        this.syncAddress(account, index + key, currentBlockHeight)
      )
    );
    return some(addressesResults, (lastTx) => !!lastTx);
  }

  async syncAccount(
    account: number,
    currentBlockHeight: number
  ): Promise<number> {
    let index = 0;
    // eslint-disable-next-line no-await-in-loop
    while (await this.checkAddressesBlock(account, index, currentBlockHeight)) {
      index += this.GAP;
    }
    return index;
  }

  // TODO : test fail case + incremental
  async sync(): Promise<number> {
    this.freshAddressIndex = 0;
    let account = 0;
    const currentBlockHeight =
      (await this.explorer.getCurrentBlock())?.height ?? 0;
    // eslint-disable-next-line no-await-in-loop
    while (
      account < 2 &&
      (await this.syncAccount(account, currentBlockHeight))
    ) {
      // account=0 for receive address; account=1 for change address. No need to handle account>1
      account += 1;
    }
    this.freshAddress = await this.crypto.getAddress(
      this.derivationMode,
      this.xpub,
      0,
      this.freshAddressIndex
    );
    return account;
  }

  async getXpubBalance(): Promise<BigNumber> {
    const addresses = await this.getXpubAddresses();
    return this.getAddressesBalance(addresses);
  }

  async getAccountBalance(account: number): Promise<BigNumber> {
    const addresses = await this.getAccountAddresses(account);
    return this.getAddressesBalance(addresses);
  }

  async getAddressBalance(address: Address): Promise<BigNumber> {
    const unspentUtxos = this.storage.getAddressUnspentUtxos(address);
    return unspentUtxos.reduce(
      (total, { value }) => total.plus(value),
      new BigNumber(0)
    );
  }

  async getXpubAddresses(): Promise<Address[]> {
    return this.storage.getUniquesAddresses({});
  }

  async getAccountAddresses(account: number): Promise<Address[]> {
    return this.storage.getUniquesAddresses({ account });
  }

  async getNewAddress(account: number, gap: number): Promise<Address> {
    const accountAddresses = await this.getAccountAddresses(account);
    const lastIndex = (maxBy(accountAddresses, "index") || { index: -1 }).index;
    let index: number;
    if (lastIndex === -1) {
      index = 0;
    } else {
      index = lastIndex + gap;
    }
    const address: Address = {
      address: await this.crypto.getAddress(
        this.derivationMode,
        this.xpub,
        account,
        index
      ),
      account,
      index,
    };

    return address;
  }

  async buildTx(params: {
    destAddress: string;
    amount: BigNumber;
    feePerByte: number;
    changeAddress: Address;
    utxoPickingStrategy: PickingStrategy;
    sequence: number;
    opReturnData?: Buffer;
  }): Promise<TransactionInfo> {
    const outputs: OutputInfo[] = [];

    const {
      amount,
      opReturnData,
      destAddress,
      changeAddress,
      utxoPickingStrategy,
      feePerByte,
      sequence,
    } = params;

    // outputs splitting
    // btc only support value fitting in uint64 and the lib
    // we use to serialize output only take js number in params
    // that are actually even more restricted
    const desiredOutputLeftToFit: OutputInfo = {
      script: this.crypto.toOutputScript(destAddress),
      value: amount,
      address: destAddress,
      isChange: false,
    };

    while (desiredOutputLeftToFit.value.gt(this.OUTPUT_VALUE_MAX)) {
      outputs.push({
        script: desiredOutputLeftToFit.script,
        value: new BigNumber(this.OUTPUT_VALUE_MAX),
        address: destAddress,
        isChange: false,
      });

      desiredOutputLeftToFit.value = desiredOutputLeftToFit.value.minus(
        this.OUTPUT_VALUE_MAX
      );
    }

    if (desiredOutputLeftToFit.value.gt(0)) {
      outputs.push(desiredOutputLeftToFit);
    }

    if (opReturnData) {
      const opReturnOutput: OutputInfo = {
        script: this.crypto.toOpReturnOutputScript(opReturnData),
        value: new BigNumber(0),
        address: null,
        isChange: false,
      };

      outputs.push(opReturnOutput);
    }

    // now we select only the output needed to cover the amount + fee
    const {
      totalValue: total,
      unspentUtxos: unspentUtxoSelected,
      fee,
      needChangeoutput,
    } = await utxoPickingStrategy.selectUnspentUtxosToUse(
      this,
      outputs,
      feePerByte
    );

    const txHexs = await Promise.all(
      unspentUtxoSelected.map((unspentUtxo) =>
        this.explorer.getTxHex(unspentUtxo.output_hash)
      )
    );

    const txs = await Promise.all(
      unspentUtxoSelected.map((unspentUtxo) =>
        this.storage.getTx(unspentUtxo.address, unspentUtxo.output_hash)
      )
    );

    const inputs: InputInfo[] = unspentUtxoSelected.map((utxo, index) => {
      return {
        txHex: txHexs[index],
        value: utxo.value,
        address: utxo.address,
        output_hash: utxo.output_hash,
        output_index: utxo.output_index,
        sequence,
      };
    });

    const associatedDerivations: [number, number][] = unspentUtxoSelected.map(
      (_utxo, index) => {
        if (txs[index] == null) {
          throw new Error("Invalid index in txs[index]");
        }
        return [txs[index]?.account || 0, txs[index]?.index || 0];
      }
    );

    const txSize = maxTxSizeCeil(
      unspentUtxoSelected.length,
      outputs.map((o) => o.script),
      true,
      this.crypto,
      this.derivationMode
    );

    const dustLimit = computeDustAmount(this.crypto, txSize);

    // Abandon the change output if change output amount is less than dust amount
    if (needChangeoutput && total.minus(amount).minus(fee).gt(dustLimit)) {
      outputs.push({
        script: this.crypto.toOutputScript(changeAddress.address),
        value: total.minus(amount).minus(fee),
        address: changeAddress.address,
        isChange: true,
      });
    }

    const outputsValue: BigNumber = outputs.reduce(
      (cur, o) => cur.plus(o.value),
      new BigNumber(0)
    );

    return {
      inputs,
      associatedDerivations,
      outputs,
      fee: total.minus(outputsValue).toNumber(),
      changeAddress: changeAddress,
    };
  }

  async broadcastTx(rawTxHex: string): Promise<any> {
    return this.explorer.broadcast(rawTxHex);
  }

  // internal
  async getAddressesBalance(addresses: Address[]): Promise<BigNumber> {
    const balances = await Promise.all(
      addresses.map((address) => this.getAddressBalance(address))
    );

    return balances.reduce(
      (total, balance) => total.plus(balance),
      new BigNumber(0)
    );
  }

  async fetchHydrateAndStoreNewTxs(
    address: string,
    account: number,
    index: number
  ): Promise<number> {
    let pendingTxs: TX[] = [];
    let txs: TX[] = [];
    let inserted = 0;
    do {
      const lastTxBlockheight =
        this.storage.getLastConfirmedTxBlockheightAndHash({
          account,
          index,
        })[0];

      txs = await this.explorer.getAddressTxsSinceLastTxBlock(
        this.txsSyncArraySize,
        { address, account, index },
        lastTxBlockheight,
        false
      );
      inserted += this.storage.appendTxs(txs); // only insert not pending tx
    } while (txs.length >= this.txsSyncArraySize); // check whether page is full, if not, it is the last page
    pendingTxs = await this.explorer.getAddressTxsSinceLastTxBlock(
      this.txsSyncArraySize,
      { address, account, index },
      0,
      true
    );
    inserted += this.storage.appendTxs(pendingTxs);
    return inserted;
  }

  async checkAddressReorg(
    account: number,
    index: number,
    currentBlockHeight: number
  ): Promise<void> {
    const [lastTxBlockheight, lastTxBlockhash] =
      this.storage.getLastConfirmedTxBlockheightAndHash({
        account,
        index,
      });

    if (
      !lastTxBlockheight ||
      currentBlockHeight - lastTxBlockheight > this.nbBlockIgnoreReorg
    ) {
      return;
    }

    const block = await this.explorer.getBlockByHeight(lastTxBlockheight);

    // all good the block is valid
    if (block && block.hash === lastTxBlockhash) {
      return;
    }

    // in this case the block is not valid so we delete everything
    // for that address
    // TODO: delete only everything for this (address, block)
    // but need to think if its possible with current storage implem

    this.storage.removeTxs({
      account,
      index,
    });
  }
}

export default Xpub;
