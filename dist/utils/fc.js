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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fc2_1 = __importDefault(require("@alicloud/fc2"));
var logger_1 = __importDefault(require("../common/logger"));
var serviceName = 'serverless-devs-check';
var functionName = 'get-domain';
var triggerName = 'httpTrigger';
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.remove = function (profile, regionId) {
        return __awaiter(this, void 0, void 0, function () {
            var client, ex_1, ex_2, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = new fc2_1.default(profile.AccountID, {
                            accessKeyID: profile.AccessKeyID,
                            accessKeySecret: profile.AccessKeySecret,
                            securityToken: profile.SecurityToken,
                            region: regionId,
                            timeout: 600 * 1000,
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        logger_1.default.debug('Delete trigger...');
                        return [4 /*yield*/, client.deleteTrigger(serviceName, functionName, triggerName)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        logger_1.default.debug("ex code: " + ex_1.code + ", ex: " + ex_1.message);
                        return [3 /*break*/, 4];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        logger_1.default.debug('Delete function...');
                        return [4 /*yield*/, client.deleteFunction(serviceName, functionName)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_2 = _a.sent();
                        logger_1.default.debug("ex code: " + ex_2.code + ", ex: " + ex_2.message);
                        return [3 /*break*/, 7];
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        logger_1.default.debug('Delete service...');
                        return [4 /*yield*/, client.deleteService(serviceName)];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        ex_3 = _a.sent();
                        logger_1.default.debug("ex code: " + ex_3.code + ", ex: " + ex_3.message);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Component.deploy = function (profile, regionId, token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.client = new fc2_1.default(profile.AccountID, {
                            accessKeyID: profile.AccessKeyID,
                            accessKeySecret: profile.AccessKeySecret,
                            region: regionId,
                            timeout: 600 * 1000,
                        });
                        return [4 /*yield*/, this.makeService({})];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.makeFunction({
                                functionName: functionName,
                                handler: 'index.handler',
                                runtime: 'nodejs8',
                                environmentVariables: { token: token },
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.makeTrigger({
                                triggerName: triggerName,
                                triggerType: 'http',
                                triggerConfig: {
                                    AuthType: 'anonymous',
                                    Methods: ['POST', 'GET'],
                                },
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.makeService = function (serviceConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        logger_1.default.debug('Create service...');
                        return [4 /*yield*/, this.client.createService(serviceName, serviceConfig)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        if (ex_4.code !== 'ServiceAlreadyExists') {
                            logger_1.default.debug("ex code: " + ex_4.code + ", ex: " + ex_4.message);
                            throw ex_4;
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Component.makeFunction = function (functionConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5, zipFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 5]);
                        logger_1.default.debug('Create function...');
                        return [4 /*yield*/, this.client.updateFunction(serviceName, functionName, functionConfig)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        ex_5 = _a.sent();
                        if (!(ex_5.code === 'FunctionNotFound')) return [3 /*break*/, 4];
                        zipFile = 'UEsDBAoAAAAIABULiFLOAhlFSQAAAE0AAAAIAAAAaW5kZXguanMdyMEJwCAMBdBVclNBskCxuxT9UGiJNgnFg8MX+o4Pc3R14/OQdkOpUFQ8mRQ2MtUujumJyv4PG6TFob3CjCEve78gtBaFkLYPUEsBAh4DCgAAAAgAFQuIUs4CGUVJAAAATQAAAAgAAAAAAAAAAAAAALSBAAAAAGluZGV4LmpzUEsFBgAAAAABAAEANgAAAG8AAAAAAA==';
                        functionConfig.code = { zipFile: zipFile };
                        return [4 /*yield*/, this.client.createFunction(serviceName, functionConfig)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                    case 4:
                        logger_1.default.debug("ex code: " + ex_5.code + ", ex: " + ex_5.message);
                        throw ex_5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Component.makeTrigger = function (triggerConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        logger_1.default.debug('Create trigger...');
                        return [4 /*yield*/, this.client.createTrigger(serviceName, functionName, triggerConfig)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        if (ex_6.code !== 'TriggerAlreadyExists') {
                            logger_1.default.debug("ex code: " + ex_6.code + ", ex: " + ex_6.message);
                            throw ex_6;
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvZmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBK0I7QUFDL0IsNERBQXNDO0FBRXRDLElBQU0sV0FBVyxHQUFHLHVCQUF1QixDQUFDO0FBQzVDLElBQU0sWUFBWSxHQUFHLFlBQVksQ0FBQztBQUNsQyxJQUFNLFdBQVcsR0FBRyxhQUFhLENBQUM7QUFFbEM7SUFBQTtJQXFHQSxDQUFDO0lBbEdjLGdCQUFNLEdBQW5CLFVBQW9CLE9BQU8sRUFBRSxRQUFnQjs7Ozs7O3dCQUNyQyxNQUFNLEdBQUcsSUFBSSxhQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTs0QkFDdkMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXOzRCQUNoQyxlQUFlLEVBQUUsT0FBTyxDQUFDLGVBQWU7NEJBQ3hDLGFBQWEsRUFBRSxPQUFPLENBQUMsYUFBYTs0QkFDcEMsTUFBTSxFQUFFLFFBQVE7NEJBQ2hCLE9BQU8sRUFBRSxHQUFHLEdBQUcsSUFBSTt5QkFDcEIsQ0FBQyxDQUFDOzs7O3dCQUdELGdCQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7d0JBQ2xDLHFCQUFNLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUMsRUFBQTs7d0JBQWxFLFNBQWtFLENBQUM7Ozs7d0JBRW5FLGdCQUFNLENBQUMsS0FBSyxDQUFDLGNBQVksSUFBRSxDQUFDLElBQUksY0FBUyxJQUFFLENBQUMsT0FBUyxDQUFDLENBQUM7Ozs7d0JBSXZELGdCQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7d0JBQ25DLHFCQUFNLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxFQUFBOzt3QkFBdEQsU0FBc0QsQ0FBQzs7Ozt3QkFFdkQs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