"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var core_1 = require("@serverless-devs/core");
var constant_1 = __importDefault(require("../../constant"));
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
                            region: regionId,
                            timeout: 600 * 1000,
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.logger.debug('Delete trigger...');
                        return [4 /*yield*/, client.deleteTrigger(serviceName, functionName, triggerName)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.logger.debug("ex code: " + ex_1.code + ", ex: " + ex_1.message);
                        return [3 /*break*/, 4];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        this.logger.debug('Delete function...');
                        return [4 /*yield*/, client.deleteFunction(serviceName, functionName)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_2 = _a.sent();
                        this.logger.debug("ex code: " + ex_2.code + ", ex: " + ex_2.message);
                        return [3 /*break*/, 7];
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        this.logger.debug('Delete service...');
                        return [4 /*yield*/, client.deleteService(serviceName)];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        ex_3 = _a.sent();
                        this.logger.debug("ex code: " + ex_3.code + ", ex: " + ex_3.message);
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
                        this.logger.debug('Create service...');
                        return [4 /*yield*/, this.client.createService(serviceName, serviceConfig)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        if (ex_4.code !== 'ServiceAlreadyExists') {
                            this.logger.debug("ex code: " + ex_4.code + ", ex: " + ex_4.message);
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
                        this.logger.debug('Create function...');
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
                        this.logger.debug("ex code: " + ex_5.code + ", ex: " + ex_5.message);
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
                        this.logger.debug('Create trigger...');
                        return [4 /*yield*/, this.client.createTrigger(serviceName, functionName, triggerConfig)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        if (ex_6.code !== 'TriggerAlreadyExists') {
                            this.logger.debug("ex code: " + ex_6.code + ", ex: " + ex_6.message);
                            throw ex_6;
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.HLogger(constant_1.default.CONTEXT),
        __metadata("design:type", Object)
    ], Component, "logger", void 0);
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvYWRkRmNEb21haW4vZmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBK0I7QUFDL0IsOENBQXlEO0FBQ3pELDREQUFzQztBQUV0QyxJQUFNLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQztBQUM1QyxJQUFNLFlBQVksR0FBRyxZQUFZLENBQUM7QUFDbEMsSUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBRWxDO0lBQUE7SUFxR0EsQ0FBQztJQWpHYyxnQkFBTSxHQUFuQixVQUFvQixPQUFPLEVBQUUsUUFBZ0I7Ozs7Ozt3QkFDckMsTUFBTSxHQUFHLElBQUksYUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7NEJBQ3ZDLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVzs0QkFDaEMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxlQUFlOzRCQUN4QyxNQUFNLEVBQUUsUUFBUTs0QkFDaEIsT0FBTyxFQUFFLEdBQUcsR0FBRyxJQUFJO3lCQUNwQixDQUFDLENBQUM7Ozs7d0JBR0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQzt3QkFDdkMscUJBQU0sTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQyxFQUFBOzt3QkFBbEUsU0FBa0UsQ0FBQzs7Ozt3QkFFbkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBWSxJQUFFLENBQUMsSUFBSSxjQUFTLElBQUUsQ0FBQyxPQUFTLENBQUMsQ0FBQzs7Ozt3QkFJNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQzt3QkFDeEMscUJBQU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLEVB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