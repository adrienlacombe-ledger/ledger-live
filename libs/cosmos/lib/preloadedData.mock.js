"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
// Data manually fetched from the network between heights
// 1685677 and 1685679
var data = {
    validators: [
        {
            validatorAddress: "cosmosvaloper1qdxmyqkvt8jsxpn5pp45a38ngs36mn2604cqk9",
            tokens: 94068472660,
            votingPower: 94068472660 / (0.7202 * 254624972017526),
            // Doing the tokens / bondedAmount division manually
            name: "\u771f\u672c\u806a&IOSG",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1qwl879nx9t6kef4supyazayf7vjhennyh568ys",
            tokens: 5614121688371,
            votingPower: 5614121688371 / (0.7202 * 254624972017526),
            name: "Certus One",
            commission: 0.125,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1qs8tnw2t8l6amtzvdemnnsq9dzk0ag0z52uzay",
            tokens: 1601669095336,
            votingPower: 1601669095336 / (0.7202 * 254624972017526),
            name: "Castlenode",
            commission: 0.09,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1qaa9zej9a0ge3ugpx3pxyx602lxh3ztqgfnp42",
            tokens: 64315316294,
            votingPower: 64315316294 / (0.7202 * 254624972017526),
            name: "CCN",
            commission: 0.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1pz0lfq40sa63n0wany3v95x3yvznc5gyf8u28w",
            tokens: 255876025886,
            votingPower: 255876025886 / (0.7202 * 254624972017526),
            name: "Cobo",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1pgsjyvkg3y2m7qas534zzdhsqsxqyph2jh3uck",
            tokens: 460520445065,
            votingPower: 460520445065 / (0.7202 * 254624972017526),
            name: "OneSixtyTwo",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1ptyzewnns2kn37ewtmv6ppsvhdnmeapvtfc9y5",
            tokens: 1079514188336,
            votingPower: 1079514188336 / (0.7202 * 254624972017526),
            name: "WeStaking",
            commission: 0.03,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1pjmngrwcsatsuyy8m3qrunaun67sr9x7z5r2qs",
            tokens: 654800077136,
            votingPower: 654800077136 / (0.7202 * 254624972017526),
            name: "Cypher Core",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1p650epkdwj0jte6sjc3ep0n3wz6jc9ehh8jutg",
            tokens: 111581429426,
            votingPower: 111581429426 / (0.7202 * 254624972017526),
            name: "Cosmos Suisse",
            commission: 0.295,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1zqgheeawp7cmqk27dgyctd80rd8ryhqs6la9wc",
            tokens: 685457020651,
            votingPower: 685457020651 / (0.7202 * 254624972017526),
            name: "melea-\u25ee\ud83d\udc41\u25ed",
            commission: 0.15,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1rpgtz9pskr5geavkjz02caqmeep7cwwpv73axj",
            tokens: 3993867332045,
            votingPower: 3993867332045 / (0.7202 * 254624972017526),
            name: "Blockpower",
            commission: 0.03,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1r8kyvg4me2upnvlk26n2ay0zd5t4jktna8hhxp",
            tokens: 250002000000,
            votingPower: 250002000000 / (0.7202 * 254624972017526),
            name: "noma",
            commission: 0.2,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1rwh0cxa72d3yle3r4l8gd7vyphrmjy2kpe4x72",
            tokens: 5232494848288,
            votingPower: 5232494848288 / (0.7202 * 254624972017526),
            name: "SparkPool",
            commission: 0.04,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1rcp29q3hpd246n6qak7jluqep4v006cdsc2kkl",
            tokens: 243735228951,
            votingPower: 243735228951 / (0.7202 * 254624972017526),
            name: "2nd only to Certus One in GoS: in3s.com",
            commission: 1.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1y0us8xvsvfvqkk9c6nt5cfyu5au5tww2ztve7q",
            tokens: 51573500874,
            votingPower: 51573500874 / (0.7202 * 254624972017526),
            name: "Swiss Staking",
            commission: 0.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper19yy989ka5usws6gsd8vl94y7l6ssgdwsrnscjc",
            tokens: 500001550260,
            votingPower: 500001550260 / (0.7202 * 254624972017526),
            name: "OKEx Pool",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1998928nfs697ep5d825y5jah0nq9zrtd00yyj7",
            tokens: 106330127188,
            votingPower: 106330127188 / (0.7202 * 254624972017526),
            name: "HLT",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper199mlc7fr6ll5t54w7tts7f4s0cvnqgc59nmuxf",
            tokens: 572547259593,
            votingPower: 572547259593 / (0.7202 * 254624972017526),
            name: "Velocity V1",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper19v9ej55ataqrfl39v83pf4e0dm69u89rngf928",
            tokens: 14367183527,
            votingPower: 14367183527 / (0.7202 * 254624972017526),
            name: "blockscape",
            commission: 0.0999,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper19j2hd230c3hw6ds843yu8akc0xgvdvyuz9v02v",
            tokens: 441495456408,
            votingPower: 441495456408 / (0.7202 * 254624972017526),
            name: "syncnode",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper19kwwdw0j64xhrmgkz49l0lmu5uyujjayxakwsn",
            tokens: 630478139847,
            votingPower: 630478139847 / (0.7202 * 254624972017526),
            name: "Firmamint",
            commission: 0.15,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1xym2qygmr9vanpa0m7ndk3n0qxgey3ffzcyd5c",
            tokens: 100666973548,
            votingPower: 100666973548 / (0.7202 * 254624972017526),
            name: "\ud83d\udc21grant.fish",
            commission: 1.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1x8rr4hcf54nz6hfckyy2n05sxss54h8wz9puzg",
            tokens: 938952777415,
            votingPower: 938952777415 / (0.7202 * 254624972017526),
            name: "cosmosgbt",
            commission: 0.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1x88j7vp2xnw3zec8ur3g4waxycyz7m0mahdv3p",
            tokens: 2037638416848,
            votingPower: 2037638416848 / (0.7202 * 254624972017526),
            name: "Staking Facilities",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1x065cjlgejk2p2la0029akfvdy52gtq9mm58ta",
            tokens: 148298393037,
            votingPower: 148298393037 / (0.7202 * 254624972017526),
            name: "MathWallet\u9ea6\u5b50\u94b1\u5305",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1grgelyng2v6v3t8z87wu3sxgt9m5s03xfytvz7",
            tokens: 5365254622915,
            votingPower: 5365254622915 / (0.7202 * 254624972017526),
            name: "iqlusion",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1gdg6qqe5a3u483unqlqsnullja23g0xvqkxtk0",
            tokens: 82601384989,
            votingPower: 82601384989 / (0.7202 * 254624972017526),
            name: "zugerselfdelegation",
            commission: 1.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1fqzqejwkk898fcslw4z4eeqjzesynvrdfr5hte",
            tokens: 412328725338,
            votingPower: 412328725338 / (0.7202 * 254624972017526),
            name: "commercio.network",
            commission: 0.09,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1ff0dw8kawsnxkrgj7p65kvw7jxxakyf8n583gx",
            tokens: 686014025437,
            votingPower: 686014025437 / (0.7202 * 254624972017526),
            name: "Compass",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1fhr7e04ct0zslmkzqt9smakg3sxrdve6ulclj2",
            tokens: 1217854931595,
            votingPower: 1217854931595 / (0.7202 * 254624972017526),
            name: "Stakin by POS Bakerz",
            commission: 0.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper12w6tynmjzq4l8zdla3v4x0jt8lt4rcz5gk7zg2",
            tokens: 3491807623168,
            votingPower: 3491807623168 / (0.7202 * 254624972017526),
            name: "Huobi Wallet",
            commission: 0.02,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper124maqmcqv8tquy764ktz7cu0gxnzfw54n3vww8",
            tokens: 606078648690,
            votingPower: 606078648690 / (0.7202 * 254624972017526),
            name: "Simply Staking",
            commission: 0.07,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1tflk30mq5vgqjdly92kkhhq3raev2hnz6eete3",
            tokens: 165498729711,
            votingPower: 165498729711 / (0.7202 * 254624972017526),
            name: "Everstake",
            commission: 0.03,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1ttfytaf43nkytzp8hkfjfgjc693ky4t3y2n2ku",
            tokens: 68002415747,
            votingPower: 68002415747 / (0.7202 * 254624972017526),
            name: "StarCluster",
            commission: 0.15,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1te8nxpc2myjfrhaty0dnzdhs5ahdh5agzuym9v",
            tokens: 3521459291389,
            votingPower: 3521459291389 / (0.7202 * 254624972017526),
            name: "CoinoneNode",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1vrg6ruw00lhszl4sjgwt5ldvl8z0f7pfp5va85",
            tokens: 342969167135,
            votingPower: 342969167135 / (0.7202 * 254624972017526),
            name: "SSSnodes",
            commission: 0.018,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1vf44d85es37hwl9f4h9gv0e064m0lla60j9luj",
            tokens: 7294838666798,
            votingPower: 7294838666798 / (0.7202 * 254624972017526),
            name: "MultiChain Ventures",
            commission: 0.02,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1vjn3559ncztu87qj8v4ryasgny7vjfx7jhxzu6",
            tokens: 6831636468,
            votingPower: 6831636468 / (0.7202 * 254624972017526),
            name: "Anonstake",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1v5y0tg0jllvxf5c3afml8s3awue0ymju89frut",
            tokens: 5856592267830,
            votingPower: 5856592267830 / (0.7202 * 254624972017526),
            name: "Zero Knowledge Validator (ZKV)",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1vk706z2tfnqhdg6jrkngyx7f463jq58nj0x7p7",
            tokens: 29544367171,
            votingPower: 29544367171 / (0.7202 * 254624972017526),
            name: "Public Payments",
            commission: 0.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1d0aup392g3enru7eash83sedqclaxvp7fzh6gk",
            tokens: 191759397236,
            votingPower: 191759397236 / (0.7202 * 254624972017526),
            name: "Stir",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1dse76yk5jmj85jsd77ewsczc4k3u4s7a870wtj",
            tokens: 399992036873,
            votingPower: 399992036873 / (0.7202 * 254624972017526),
            name: "gf.network",
            commission: 0.08,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1de7qx00pz2j6gn9k88ntxxylelkazfk3g8fgh9",
            tokens: 235286250874,
            votingPower: 235286250874 / (0.7202 * 254624972017526),
            name: "Cosmic Validator",
            commission: 0.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1d7ufwp2rgfj7s7pfw2q7vm2lc9txmr8vh77ztr",
            tokens: 117924360855,
            votingPower: 117924360855 / (0.7202 * 254624972017526),
            name: "Cybernetic Destiny",
            commission: 0.2,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1wp9jne5t3e4au7u8gfep90g59j0qdhpeqvlg7n",
            tokens: 90066203985,
            votingPower: 90066203985 / (0.7202 * 254624972017526),
            name: "Newroad Network",
            commission: 0.08,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1wtv0kp6ydt03edd8kyr5arr4f3yc52vp3u2x3u",
            tokens: 353702000001,
            votingPower: 353702000001 / (0.7202 * 254624972017526),
            name: "kytzu",
            commission: 0.15,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1wdrypwex63geqswmcy5qynv4w3z3dyef2qmyna",
            tokens: 457219720569,
            votingPower: 457219720569 / (0.7202 * 254624972017526),
            name: "Genesis Lab",
            commission: 0.07,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1w0494h0l4mneaq7ajkrcjvn73m2n04l87j2nst",
            tokens: 96455451062,
            votingPower: 96455451062 / (0.7202 * 254624972017526),
            name: "Angel",
            commission: 0.2,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1w42lm7zv55jrh5ggpecg0v643qeatfkd9aqf3f",
            tokens: 757388512720,
            votingPower: 757388512720 / (0.7202 * 254624972017526),
            name: "Mythos",
            commission: 0.15,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1we6knm8qartmmh2r0qfpsz6pq0s7emv3e0meuw",
            tokens: 1823932422233,
            votingPower: 1823932422233 / (0.7202 * 254624972017526),
            name: "Staked",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1wauge4px27c257nfn4k3329wteddqw7gs3n66u",
            tokens: 170766070827,
            votingPower: 170766070827 / (0.7202 * 254624972017526),
            name: "DappPub",
            commission: 0.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper102ruvpv2srmunfffxavttxnhezln6fnc54at8c",
            tokens: 419847884853,
            votingPower: 419847884853 / (0.7202 * 254624972017526),
            name: "Ztake.org",
            commission: 0.07,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper10wz6lfhmqfw6egg0062ytnawaj6vr89ly5g4yg",
            tokens: 85001650000,
            votingPower: 85001650000 / (0.7202 * 254624972017526),
            name: "BitMax Staking",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1000ya26q2cmh399q4c5aaacd9lmmdqp90kw2jn",
            tokens: 457836803479,
            votingPower: 457836803479 / (0.7202 * 254624972017526),
            name: "Staking Fund",
            commission: 0.12,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper10nzaaeh2kq28t3nqsh5m8kmyv90vx7ym5mpakx",
            tokens: 73145988986,
            votingPower: 73145988986 / (0.7202 * 254624972017526),
            name: "Blockdaemon",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper10e4vsut6suau8tk9m6dnrm0slgd6npe3jx5xpv",
            tokens: 3590589521416,
            votingPower: 3590589521416 / (0.7202 * 254624972017526),
            name: "B-Harvest",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1sxx9mszve0gaedz5ld7qdkjkfv8z992ax69k08",
            tokens: 2277639587814,
            votingPower: 2277639587814 / (0.7202 * 254624972017526),
            name: "validator.network | Security first. Highly available.",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1sd4tl9aljmmezzudugs7zlaya7pg2895ws8tfs",
            tokens: 1424894200299,
            votingPower: 1424894200299 / (0.7202 * 254624972017526),
            name: "InfStones (Infinity Stones)",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1s05va5d09xlq3et8mapsesqh6r5lqy7mkhwshm",
            tokens: 557176831790,
            votingPower: 557176831790 / (0.7202 * 254624972017526),
            name: "Wetez",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1ssm0d433seakyak8kcf93yefhknjleeds4y3em",
            tokens: 1515889266517,
            votingPower: 1515889266517 / (0.7202 * 254624972017526),
            name: "IRISnet-Bianjie",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1sjllsnramtg3ewxqwwrwjxfgc4n4ef9u2lcnj0",
            tokens: 12672613496348,
            votingPower: 12672613496348 / (0.7202 * 254624972017526),
            name: "\ud83d\udc20stake.fish",
            commission: 0.04,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1s6x9fy4wc49wj9jx4jv6czredqsmp46h7vnk2q",
            tokens: 727981844212,
            votingPower: 727981844212 / (0.7202 * 254624972017526),
            name: "SNZPool",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1s6t3wzx6mcv3pjg5fp2ddzplm3gj4pg6d330wg",
            tokens: 245002260000,
            votingPower: 245002260000 / (0.7202 * 254624972017526),
            name: "omega3",
            commission: 0.2,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1s65zmn32zugl57ysj47s7vmfcek0rtd7he7wde",
            tokens: 194202250000,
            votingPower: 194202250000 / (0.7202 * 254624972017526),
            name: "firstblock",
            commission: 0.2,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1s7jnk7t6yqzensdgpvkvkag022udk842qdjdtd",
            tokens: 337798355546,
            votingPower: 337798355546 / (0.7202 * 254624972017526),
            name: "Blockscale",
            commission: 0.25,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper132juzk0gdmwuxvx4phug7m3ymyatxlh9734g4w",
            tokens: 2771968523134,
            votingPower: 2771968523134 / (0.7202 * 254624972017526),
            name: "P2P.ORG - P2P Validator",
            commission: 0.01,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper130mdu9a0etmeuw52qfxk73pn0ga6gawkxsrlwf",
            tokens: 1127721623309,
            votingPower: 1127721623309 / (0.7202 * 254624972017526),
            name: "jackzampolin",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper13sduv92y3xdhy3rpmhakrc3v7t37e7ps9l0kpv",
            tokens: 1574051576303,
            votingPower: 1574051576303 / (0.7202 * 254624972017526),
            name: "nylira.net",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper13ce7hhqa0z3tpc2l7jm0lcvwe073hdkkpp2nst",
            tokens: 61729191815,
            votingPower: 61729191815 / (0.7202 * 254624972017526),
            name: "RockX",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1jxv0u20scum4trha72c7ltfgfqef6nsch7q6cu",
            tokens: 302293155457,
            votingPower: 302293155457 / (0.7202 * 254624972017526),
            name: "Ping.pub",
            commission: 0.02,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1j0vaeh27t4rll7zhmarwcuq8xtrmvqhudrgcky",
            tokens: 1072128285988,
            votingPower: 1072128285988 / (0.7202 * 254624972017526),
            name: "chainflow-cosmos-prodval-01",
            commission: 0.12,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1jlr62guqwrwkdt4m3y00zh2rrsamhjf9num5xr",
            tokens: 723902889269,
            votingPower: 723902889269 / (0.7202 * 254624972017526),
            name: "StakeWith.Us",
            commission: 0.15,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1n3f5lm7xtlrp05z9ud2xk2cnvk2xnzkm2he6er",
            tokens: 16031529975,
            votingPower: 16031529975 / (0.7202 * 254624972017526),
            name: "AirGap \ud83d\udee1",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1n5pu2rtz4e2skaeatcmlexza7kheedzh8a2680",
            tokens: 576087977754,
            votingPower: 576087977754 / (0.7202 * 254624972017526),
            name: "BlockMatrix \ud83d\ude80",
            commission: 0.15,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1nm0rrq86ucezaf8uj35pq9fpwr5r82clzyvtd8",
            tokens: 145001000000,
            votingPower: 145001000000 / (0.7202 * 254624972017526),
            name: "Cthulhu",
            commission: 1.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper15r4tc0m6hc7z8drq3dzlrtcs6rq2q9l2nvwher",
            tokens: 731460206153,
            votingPower: 731460206153 / (0.7202 * 254624972017526),
            name: "DragonStake",
            commission: 0.2,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper159eexl76jlygrxnfreehl3j9tt70d8wfnn39fw",
            tokens: 12063850000,
            votingPower: 12063850000 / (0.7202 * 254624972017526),
            name: "fishegg.net",
            commission: 0.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper156gqf9837u7d4c4678yt3rl4ls9c5vuursrrzf",
            tokens: 9777967988806,
            votingPower: 9777967988806 / (0.7202 * 254624972017526),
            name: "Binance Staking",
            commission: 0.025,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper15urq2dtp9qce4fyc85m6upwm9xul3049e02707",
            tokens: 4772542296164,
            votingPower: 4772542296164 / (0.7202 * 254624972017526),
            name: "Chorus One",
            commission: 0.075,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1402ggxz5u6vm29sqztwqq8vxs3ke6dmwl2z5dk",
            tokens: 9876491249,
            votingPower: 9876491249 / (0.7202 * 254624972017526),
            name: "Cosmoon",
            commission: 0.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper14kn0kk33szpwus9nh8n87fjel8djx0y070ymmj",
            tokens: 2283034789245,
            votingPower: 2283034789245 / (0.7202 * 254624972017526),
            name: "Forbole",
            commission: 0.095,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper14k4pzckkre6uxxyd2lnhnpp8sngys9m6hl6ml7",
            tokens: 11377195150426,
            votingPower: 11377195150426 / (0.7202 * 254624972017526),
            name: "Polychain Labs",
            commission: 0.2,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper146kwpzhmleafmhtaxulfptyhnvwxzlvm87hwnm",
            tokens: 85876621420,
            votingPower: 85876621420 / (0.7202 * 254624972017526),
            name: "\ud83c\udf10 KysenPool.io",
            commission: 0.079,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper14az9dmutwtz4vuycvae8csm4wwwtm0aumtlppe",
            tokens: 1745837039221,
            votingPower: 1745837039221 / (0.7202 * 254624972017526),
            name: "F4RM",
            commission: 0.2,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper14l0fp639yudfl46zauvv8rkzjgd4u0zk2aseys",
            tokens: 2122758592391,
            votingPower: 2122758592391 / (0.7202 * 254624972017526),
            name: "ATEAM",
            commission: 0.099,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper14lultfckehtszvzw4ehu0apvsr77afvyju5zzy",
            tokens: 11208313955328,
            votingPower: 11208313955328 / (0.7202 * 254624972017526),
            name: "DokiaCapital",
            commission: 0.15,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1k9a0cs97vul8w2vwknlfmpez6prv8klv03lv3d",
            tokens: 900577706145,
            votingPower: 900577706145 / (0.7202 * 254624972017526),
            name: "Stake Capital",
            commission: 0.08,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1kgquh04ffqvadekf6e47070gskm0s0h28cl7ht",
            tokens: 25070019650,
            votingPower: 25070019650 / (0.7202 * 254624972017526),
            name: "tokenweb.io",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1kgddca7qj96z0qcxr2c45z73cfl0c75p7f3s2e",
            tokens: 580104464471,
            votingPower: 580104464471 / (0.7202 * 254624972017526),
            name: "ChainLayer",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1ktecz4dr56j9tsfh7nwg8s9suvhfu70qykhu5s",
            tokens: 7177032902,
            votingPower: 7177032902 / (0.7202 * 254624972017526),
            name: "Dawns.World",
            commission: 0.2,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1kj0h4kn4z5xvedu2nd9c4a9a559wvpuvu0h6qn",
            tokens: 1564696374061,
            votingPower: 1564696374061 / (0.7202 * 254624972017526),
            name: "Cryptium Labs",
            commission: 0.11,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1kn3wugetjuy4zetlq6wadchfhvu3x740ae6z6x",
            tokens: 2186095379303,
            votingPower: 2186095379303 / (0.7202 * 254624972017526),
            name: "HuobiPool",
            commission: 0.04,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1hvsdf03tl6w5pnfvfv5g8uphjd4wfw2h4gvnl7",
            tokens: 100004083306,
            votingPower: 100004083306 / (0.7202 * 254624972017526),
            name: "Atom.Bi23",
            commission: 0.5,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1hjct6q7npsspsg3dgvzk3sdf89spmlpfdn6m9d",
            tokens: 4535001052736,
            votingPower: 4535001052736 / (0.7202 * 254624972017526),
            name: "Figment Networks",
            commission: 0.09,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1crqm3598z6qmyn2kkcl9dz7uqs4qdqnr6s8jdn",
            tokens: 448224981318,
            votingPower: 448224981318 / (0.7202 * 254624972017526),
            name: "Bison Trails",
            commission: 0.08,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1cgh5ksjwy2sd407lyre4l3uj2fdrqhpkzp06e6",
            tokens: 930334262431,
            votingPower: 930334262431 / (0.7202 * 254624972017526),
            name: "HashQuark",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn",
            tokens: 6035834449351,
            votingPower: 6035834449351 / (0.7202 * 254624972017526),
            name: "Cosmostation",
            commission: 0.12,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1ey69r37gfxvxg62sh4r0ktpuc46pzjrm873ae8",
            tokens: 10331638721447,
            votingPower: 10331638721447 / (0.7202 * 254624972017526),
            name: "Sikka",
            commission: 0.03,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1et77usu8q2hargvyusl4qzryev8x8t9wwqkxfs",
            tokens: 7171716873,
            votingPower: 7171716873 / (0.7202 * 254624972017526),
            name: "\ud83d\udc7ereplicator.network",
            commission: 0.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1e0plfg475phrsvrlzw8gwppeva0zk5yg9fgg8c",
            tokens: 331888417159,
            votingPower: 331888417159 / (0.7202 * 254624972017526),
            name: "Easy 2 Stake",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1e0jnq2sun3dzjh8p2xq95kk0expwmd7sj6x59m",
            tokens: 115925233338,
            votingPower: 115925233338 / (0.7202 * 254624972017526),
            name: "Fission Labs",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1eh5mwu044gd5ntkkc2xgfg8247mgc56fz4sdg3",
            tokens: 2149942889528,
            votingPower: 2149942889528 / (0.7202 * 254624972017526),
            name: "BouBouNode",
            commission: 0.061,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1ehkfl7palwrh6w2hhr2yfrgrq8jetgucudztfe",
            tokens: 1177445517966,
            votingPower: 1177445517966 / (0.7202 * 254624972017526),
            name: "KalpaTech",
            commission: 0.15,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1ec3p6a75mqwkv33zt543n6cnxqwun37rr5xlqv",
            tokens: 1016351149259,
            votingPower: 1016351149259 / (0.7202 * 254624972017526),
            name: "lunamint",
            commission: 0.15,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1emaa7mwgpnpmc7yptm728ytp9quamsvu837nc0",
            tokens: 525674038457,
            votingPower: 525674038457 / (0.7202 * 254624972017526),
            name: "kochacolaj",
            commission: 0.2,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1eup5t8pp8jq354heck53qtama7vss9l354kh6r",
            tokens: 10418995367,
            votingPower: 10418995367 / (0.7202 * 254624972017526),
            name: "IZ0",
            commission: 0.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper16qme5yxucnaj6snx35nmwze0wyxr8wfgqxsqfw",
            tokens: 330184377372,
            votingPower: 330184377372 / (0.7202 * 254624972017526),
            name: "KIRA Staking",
            commission: 0.01,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper16v3f95amtvpewuajjcdsvaekuuy4yyzups85ec",
            tokens: 181360488389,
            votingPower: 181360488389 / (0.7202 * 254624972017526),
            name: "BlockPool",
            commission: 0.02,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1648ynlpdw7fqa2axt0w2yp3fk542junl7rsvq6",
            tokens: 969517688431,
            votingPower: 969517688431 / (0.7202 * 254624972017526),
            name: "Any Labs",
            commission: 0.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper16k579jk6yt2cwmqx9dz5xvq9fug2tekvlu9qdv",
            tokens: 928468619631,
            votingPower: 928468619631 / (0.7202 * 254624972017526),
            name: "Cephalopod Equipment",
            commission: 0.0811,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1mykn77lkynl8fkwvl9tqg369u0zajzzcdhkptq",
            tokens: 90061196918,
            votingPower: 90061196918 / (0.7202 * 254624972017526),
            name: "Nodeasy.com",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1m83cwjucw9nt8xm66u8xavvy6v9m7xfspcszc5",
            tokens: 159702133794,
            votingPower: 159702133794 / (0.7202 * 254624972017526),
            name: "Fenbushi US - Staked",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1ma02nlc7lchu7caufyrrqt4r6v2mpsj90y9wzd",
            tokens: 3451941483054,
            votingPower: 3451941483054 / (0.7202 * 254624972017526),
            name: "hashtower",
            commission: 0.03,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1uxh465053nq3at4dn0jywgwq3s9sme3la3drx6",
            tokens: 520172159921,
            votingPower: 520172159921 / (0.7202 * 254624972017526),
            name: "Bison Trails",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1uhnsxv6m83jj3328mhrql7yax3nge5svrv6t6c",
            tokens: 720793765456,
            votingPower: 720793765456 / (0.7202 * 254624972017526),
            name: "Skystar Capital",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1u6ddcsjueax884l3tfrs66497c7g86skn7pa0u",
            tokens: 809489102763,
            votingPower: 809489102763 / (0.7202 * 254624972017526),
            name: "Sentinel",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1uutuwrwt3z2a5z8z3uasml3rftlpmu25aga5c6",
            tokens: 895225796893,
            votingPower: 895225796893 / (0.7202 * 254624972017526),
            name: "Delega Networks\u267e ",
            commission: 0.2,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1ul2me6vukg2vac2p6ltxmqlaa7jywdgt8q76ag",
            tokens: 1214088124061,
            votingPower: 1214088124061 / (0.7202 * 254624972017526),
            name: "HyperblocksPro",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1a3yjj7d3qnx4spgvjcwjq9cw9snrrrhu5h6jll",
            tokens: 10028697349,
            votingPower: 10028697349 / (0.7202 * 254624972017526),
            name: "Coinbase Custody",
            commission: 0.2,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper17h2x3j7u44qkrq0sk8ul0r2qr440rwgjkfg0gh",
            tokens: 571902934315,
            votingPower: 571902934315 / (0.7202 * 254624972017526),
            name: "FRESHATOMS",
            commission: 0.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper17mggn4znyeyg25wd7498qxl7r2jhgue8u4qjcq",
            tokens: 1079608204356,
            votingPower: 1079608204356 / (0.7202 * 254624972017526),
            name: "01node",
            commission: 0.1,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1l9fwl9c77zx850htsr20pq3ltc379xt86ndelm",
            tokens: 10182710273,
            votingPower: 10182710273 / (0.7202 * 254624972017526),
            name: "CosmosLink",
            commission: 0.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1lktjhnzkpkz3ehrg8psvmwhafg56kfss3q3t8m",
            tokens: 1658474619720,
            votingPower: 1658474619720 / (0.7202 * 254624972017526),
            name: "Umbrella \u2614",
            commission: 0.0704,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1lcwxu50rvvgf9v6jy6q5mrzyhlszwtjxhtscmp",
            tokens: 10418082544,
            votingPower: 10418082544 / (0.7202 * 254624972017526),
            name: "stake.zone",
            commission: 0.0,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: "cosmosvaloper1l6udzyaz8xaxv4hpagwauacm95jlcec3xlht2u",
            tokens: 11107365900,
            votingPower: 11107365900 / (0.7202 * 254624972017526),
            name: "StakeHouse",
            commission: 0.01,
            estimatedYearlyRewardsRate: 0
        },
        {
            validatorAddress: utils_1.LEDGER_VALIDATOR_ADDRESS,
            tokens: 11107365900,
            votingPower: 11107365900 / (0.7202 * 254624972017526),
            name: "Ledger",
            commission: 0.075,
            estimatedYearlyRewardsRate: 0
        },
    ]
};
exports["default"] = data;
//# sourceMappingURL=preloadedData.mock.js.map