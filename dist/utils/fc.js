"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var core = __importStar(require("@serverless-devs/core"));
var logger_1 = __importDefault(require("../common/logger"));
var serviceName = 'serverless-devs-check';
var functionName = 'get-domain';
var triggerName = 'httpTrigger';
function getFcEndpoint() {
    return __awaiter(this, void 0, void 0, function () {
        var fcDefault, fcEndpoint, enableFcEndpoint;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core.loadComponent('devsapp/fc-default')];
                case 1:
                    fcDefault = _a.sent();
                    return [4 /*yield*/, fcDefault.get({ args: 'fc-endpoint' })];
                case 2:
                    fcEndpoint = _a.sent();
                    if (!fcEndpoint) {
                        return [2 /*return*/, undefined];
                    }
                    return [4 /*yield*/, fcDefault.get({ args: 'enable-fc-endpoint' })];
                case 3:
                    enableFcEndpoint = _a.sent();
                    return [2 /*return*/, (enableFcEndpoint === true || enableFcEndpoint === 'true') ? fcEndpoint : undefined];
            }
        });
    });
}
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.remove = function (profile, regionId) {
        return __awaiter(this, void 0, void 0, function () {
            var client, _a, _b, _c, ex_1, ex_2, ex_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = fc2_1.default.bind;
                        _b = [void 0, profile.AccountID];
                        _c = {
                            accessKeyID: profile.AccessKeyID,
                            accessKeySecret: profile.AccessKeySecret,
                            securityToken: profile.SecurityToken,
                            region: regionId
                        };
                        return [4 /*yield*/, getFcEndpoint()];
                    case 1:
                        client = new (_a.apply(fc2_1.default, _b.concat([(_c.endpoint = _d.sent(),
                                _c.timeout = 600 * 1000,
                                _c)])))();
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, , 5]);
                        logger_1.default.debug('Delete trigger...');
                        return [4 /*yield*/, client.deleteTrigger(serviceName, functionName, triggerName)];
                    case 3:
                        _d.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _d.sent();
                        logger_1.default.debug("ex code: " + ex_1.code + ", ex: " + ex_1.message);
                        return [3 /*break*/, 5];
                    case 5:
                        _d.trys.push([5, 7, , 8]);
                        logger_1.default.debug('Delete function...');
                        return [4 /*yield*/, client.deleteFunction(serviceName, functionName)];
                    case 6:
                        _d.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        ex_2 = _d.sent();
                        logger_1.default.debug("ex code: " + ex_2.code + ", ex: " + ex_2.message);
                        return [3 /*break*/, 8];
                    case 8:
                        _d.trys.push([8, 10, , 11]);
                        logger_1.default.debug('Delete service...');
                        return [4 /*yield*/, client.deleteService(serviceName)];
                    case 9:
                        _d.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        ex_3 = _d.sent();
                        logger_1.default.debug("ex code: " + ex_3.code + ", ex: " + ex_3.message);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    Component.deploy = function (profile, regionId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _b = fc2_1.default.bind;
                        _c = [void 0, profile.AccountID];
                        _d = {
                            accessKeyID: profile.AccessKeyID,
                            accessKeySecret: profile.AccessKeySecret,
                            region: regionId
                        };
                        return [4 /*yield*/, getFcEndpoint()];
                    case 1:
                        _a.client = new (_b.apply(fc2_1.default, _c.concat([(_d.endpoint = _e.sent(),
                                _d.timeout = 600 * 1000,
                                _d)])))();
                        return [4 /*yield*/, this.makeService({})];
                    case 2:
                        _e.sent();
                        return [4 /*yield*/, this.makeFunction({
                                functionName: functionName,
                                handler: 'index.handler',
                                runtime: 'nodejs8',
                                environmentVariables: { token: token },
                            })];
                    case 3:
                        _e.sent();
                        return [4 /*yield*/, this.makeTrigger({
                                triggerName: triggerName,
                                triggerType: 'http',
                                triggerConfig: {
                                    AuthType: 'anonymous',
                                    Methods: ['POST', 'GET'],
                                },
                            })];
                    case 4:
                        _e.sent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvZmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQStCO0FBQy9CLDBEQUE4QztBQUM5Qyw0REFBc0M7QUFFdEMsSUFBTSxXQUFXLEdBQUcsdUJBQXVCLENBQUM7QUFDNUMsSUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDO0FBQ2xDLElBQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQztBQUVsQyxTQUFlLGFBQWE7Ozs7O3dCQUNSLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsRUFBQTs7b0JBQTFELFNBQVMsR0FBRyxTQUE4QztvQkFDckMscUJBQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFBOztvQkFBakUsVUFBVSxHQUFXLFNBQTRDO29CQUN2RSxJQUFJLENBQUMsVUFBVSxFQUFFO3dCQUFFLHNCQUFPLFNBQVMsRUFBQztxQkFBRTtvQkFDUixxQkFBTSxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLENBQUMsRUFBQTs7b0JBQTNFLGdCQUFnQixHQUFRLFNBQW1EO29CQUNqRixzQkFBTyxDQUFDLGdCQUFnQixLQUFLLElBQUksSUFBSSxnQkFBZ0IsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUM7Ozs7Q0FDNUY7QUFFRDtJQUFBO0lBdUdBLENBQUM7SUFwR2MsZ0JBQU0sR0FBbkIsVUFBb0IsT0FBTyxFQUFFLFFBQWdCOzs7Ozs7NkJBQ3hCLGFBQUU7c0NBQUMsT0FBTyxDQUFDLFNBQVM7OzRCQUNyQyxXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7NEJBQ2hDLGVBQWUsRUFBRSxPQUFP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