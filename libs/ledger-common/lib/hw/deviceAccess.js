"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.withDevicePolling = exports.retryWhileErrors = exports.genericCanRetryOnError = exports.withDevice = exports.cancelDeviceAction = exports.setErrorRemapping = exports.addAccessHook = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var errors_1 = require("@ledgerhq/errors");
var env_1 = require("../env");
var _1 = require(".");
var initialErrorRemapping = function (error) {
    return (0, rxjs_1.throwError)(error &&
        error instanceof errors_1.TransportStatusError &&
        // @ts-expect-error typescript not checking agains the instanceof
        error.statusCode === 0x6faa
        ? new errors_1.DeviceHalted(error.message)
        : error.statusCode === 0x6b00
            ? new errors_1.FirmwareOrAppUpdateRequired(error.message)
            : error);
};
var accessHooks = [];
var errorRemapping = function (e) { return (0, rxjs_1.throwError)(e); };
var addAccessHook = function (accessHook) {
    accessHooks.push(accessHook);
};
exports.addAccessHook = addAccessHook;
var setErrorRemapping = function (f) {
    errorRemapping = f;
};
exports.setErrorRemapping = setErrorRemapping;
var never = new Promise(function () { });
var transportFinally = function (cleanup) {
    return function (observable) {
        return rxjs_1.Observable.create(function (o) {
            var done = false;
            var finalize = function () {
                if (done)
                    return never;
                done = true;
                return cleanup();
            };
            var sub = observable.subscribe({
                next: function (e) { return o.next(e); },
                complete: function () {
                    finalize().then(function () { return o.complete(); });
                },
                error: function (e) {
                    finalize().then(function () { return o.error(e); });
                }
            });
            return function () {
                sub.unsubscribe();
                finalize();
            };
        });
    };
};
var identifyTransport = function (t) { return (typeof t.id === "string" ? t.id : ""); };
var needsCleanup = {};
// when a series of APDUs are interrupted, this is called
// so we don't forget to cleanup on the next withDevice
var cancelDeviceAction = function (transport) {
    needsCleanup[identifyTransport(transport)] = true;
};
exports.cancelDeviceAction = cancelDeviceAction;
var deviceQueues = {};
var withDevice = function (deviceId) {
    return function (job) {
        return new rxjs_1.Observable(function (o) {
            var unsubscribed;
            var sub;
            var deviceQueue = deviceQueues[deviceId] || Promise.resolve();
            var finalize = function (transport, cleanups) {
                (0, _1.setAllowAutoDisconnect)(transport, deviceId, true);
                return (0, _1.close)(transport, deviceId)["catch"](function () { })
                    .then(function () {
                    cleanups.forEach(function (c) { return c(); });
                });
            };
            // when we'll finish all the current job, we'll call finish
            var finish;
            // this new promise is the next exec queue
            deviceQueues[deviceId] = new Promise(function (resolve) {
                finish = resolve;
            });
            // for any new job, we'll now wait the exec queue to be available
            deviceQueue
                .then(function () { return (0, _1.open)(deviceId); }) // open the transport
                .then(function (transport) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, _1.setAllowAutoDisconnect)(transport, deviceId, false);
                            if (unsubscribed) {
                                // it was unsubscribed prematurely
                                return [2 /*return*/, finalize(transport, [finish])];
                            }
                            if (!needsCleanup[identifyTransport(transport)]) return [3 /*break*/, 2];
                            delete needsCleanup[identifyTransport(transport)];
                            return [4 /*yield*/, transport.send(0, 0, 0, 0)["catch"](function () { })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            if (!(transport.requestConnectionPriority &&
                                typeof transport.requestConnectionPriority === "function")) return [3 /*break*/, 4];
                            return [4 /*yield*/, transport.requestConnectionPriority("High")];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/, transport];
                    }
                });
            }); })["catch"](function (e) {
                finish();
                if (e instanceof errors_1.BluetoothRequired)
                    throw e;
                if (e instanceof errors_1.TransportWebUSBGestureRequired)
                    throw e;
                if (e instanceof errors_1.TransportInterfaceNotAvailable)
                    throw e;
                throw new errors_1.CantOpenDevice(e.message);
            })
                .then(function (transport) {
                if (!transport)
                    return;
                if (unsubscribed) {
                    // it was unsubscribed prematurely
                    return finalize(transport, [finish]);
                }
                var cleanups = accessHooks.map(function (hook) { return hook(); });
                sub = job(transport) // $FlowFixMe
                    .pipe((0, operators_1.catchError)(initialErrorRemapping), (0, operators_1.catchError)(errorRemapping), // close the transport and clean up everything
                // $FlowFixMe
                transportFinally(function () { return finalize(transport, __spreadArray(__spreadArray([], __read(cleanups), false), [finish], false)); }))
                    .subscribe(o);
            })["catch"](function (error) { return o.error(error); });
            return function () {
                unsubscribed = true;
                if (sub)
                    sub.unsubscribe();
            };
        });
    };
};
exports.withDevice = withDevice;
var genericCanRetryOnError = function (err) {
    if (err instanceof errors_1.WrongAppForCurrency)
        return false;
    if (err instanceof errors_1.WrongDeviceForAccount)
        return false;
    if (err instanceof errors_1.CantOpenDevice)
        return false;
    if (err instanceof errors_1.BluetoothRequired)
        return false;
    if (err instanceof errors_1.UpdateYourApp)
        return false;
    if (err instanceof errors_1.FirmwareOrAppUpdateRequired)
        return false;
    if (err instanceof errors_1.DeviceHalted)
        return false;
    if (err instanceof errors_1.TransportWebUSBGestureRequired)
        return false;
    if (err instanceof errors_1.TransportInterfaceNotAvailable)
        return false;
    return true;
};
exports.genericCanRetryOnError = genericCanRetryOnError;
var retryWhileErrors = function (acceptError) {
    return function (attempts) {
        return attempts.pipe((0, operators_1.mergeMap)(function (error) {
            if (!acceptError(error)) {
                return (0, rxjs_1.throwError)(error);
            }
            return (0, rxjs_1.timer)((0, env_1.getEnv)("WITH_DEVICE_POLLING_DELAY"));
        }));
    };
};
exports.retryWhileErrors = retryWhileErrors;
var withDevicePolling = function (deviceId) {
    return function (job, acceptError) {
        if (acceptError === void 0) { acceptError = exports.genericCanRetryOnError; }
        return (0, exports.withDevice)(deviceId)(job).pipe((0, operators_1.retryWhen)((0, exports.retryWhileErrors)(acceptError)));
    };
};
exports.withDevicePolling = withDevicePolling;
//# sourceMappingURL=deviceAccess.js.map