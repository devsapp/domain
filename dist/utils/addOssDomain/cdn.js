"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var core_1 = require("@serverless-devs/core");
var constant_1 = __importDefault(require("../../constant"));
var utils_1 = require("../utils");
var POST = { method: 'POST' };
var DOMAIN = 'devsapp.cn';
var Cdn = /** @class */ (function () {
    function Cdn(credentials) {
        this.cdnClient = utils_1.getPopClient(credentials, 'https://cdn.aliyuncs.com', '2018-05-10');
    }
    Cdn.prototype.makeOwner = function (bucket, region, token) {
        return __awaiter(this, void 0, void 0, function () {
            var isDomainOwner, verify, dRs, rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('Check verify domain owner start...');
                        return [4 /*yield*/, this.verifyDomainOwner(DOMAIN)];
                    case 1:
                        isDomainOwner = _a.sent();
                        this.logger.debug("Check verify domain owner end, response is: " + isDomainOwner);
                        if (!!isDomainOwner) return [3 /*break*/, 7];
                        this.logger.debug('Get describe verify content start...');
                        return [4 /*yield*/, this.describeVerifyContent(DOMAIN)];
                    case 2:
                        verify = _a.sent();
                        this.logger.debug("Get describe verify content end, response is: " + verify);
                        this.logger.debug("The request " + constant_1.default.DOMAIN + "/domain parameter is: { bucket: " + bucket + ", region: " + region + ", token: " + token + " }");
                        return [4 /*yield*/, core_1.request(constant_1.default.DOMAIN + "/domain", {
                                method: 'post',
                                body: { bucket: bucket, region: region, token: token, type: 'oss' },
                                form: true,
                                hint: __assign(__assign({}, constant_1.default.HINT), { loading: 'Get domain....' }),
                            })];
                    case 3:
                        dRs = _a.sent();
                        this.logger.debug("The request " + constant_1.default.DOMAIN + "/verify response is: \n " + JSON.stringify(dRs, null, '  '));
                        utils_1.checkRs(dRs);
                        this.logger.debug("The request " + constant_1.default.DOMAIN + "/verify parameter is: { bucket: " + bucket + ", verify: " + verify + " }");
                        return [4 /*yield*/, core_1.request(constant_1.default.DOMAIN + "/verify", {
                                method: 'post',
                                body: { bucket: bucket, verify: verify },
                                form: true,
                                hint: __assign(__assign({}, constant_1.default.HINT), { loading: 'Request verify....' }),
                            })];
                    case 4:
                        rs = _a.sent();
                        this.logger.debug("The request " + constant_1.default.DOMAIN + "/verify response is: \n " + JSON.stringify(rs, null, '  '));
                        utils_1.checkRs(rs);
                        return [4 /*yield*/, utils_1.sleep(1000)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.makeOwner(bucket, region, token)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Cdn.prototype.verifyDomainOwner = function (domainName) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.cdnClient.request('VerifyDomainOwner', {
                                DomainName: domainName,
                                VerifyType: 'dnsCheck',
                            }, POST)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        ex_1 = _a.sent();
                        this.logger.debug("VerifyDomainOwner domain name is " + domainName + ", error is: \n " + ex_1);
                        if (ex_1.code !== 'DomainOwnerVerifyFail') {
                            throw ex_1;
                        }
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Cdn.prototype.describeVerifyContent = function (domainName) {
        return __awaiter(this, void 0, void 0, function () {
            var Content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cdnClient.request('DescribeVerifyContent', { DomainName: domainName }, POST)];
                    case 1:
                        Content = (_a.sent()).Content;
                        return [2 /*return*/, Content];
                }
            });
        });
    };
    Cdn.prototype.addCdnDomain = function (domainName, bucket, region) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.cdnClient.request('AddCdnDomain', {
                                DomainName: domainName,
                                Scope: 'global',
                                CdnType: 'web',
                                Sources: JSON.stringify([
                                    { type: 'oss', port: 80, content: bucket + "." + region + ".aliyuncs.com" },
                                ]),
                            }, POST)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        if (ex_2.code !== 'DomainAlreadyExist') {
                            throw ex_2;
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
    ], Cdn.prototype, "logger", void 0);
    return Cdn;
}());
exports.default = Cdn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2FkZE9zc0RvbWFpbi9jZG4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUFrRTtBQUVsRSw0REFBc0M7QUFDdEMsa0NBQXdEO0FBR3hELElBQU0sSUFBSSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQ2hDLElBQU0sTUFBTSxHQUFHLFlBQVksQ0FBQztBQUU1QjtJQUlFLGFBQVksV0FBeUI7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxvQkFBWSxDQUFDLFdBQVcsRUFBRSwwQkFBMEIsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRUssdUJBQVMsR0FBZixVQUFnQixNQUFjLEVBQUUsTUFBYyxFQUFFLEtBQWE7Ozs7Ozt3QkFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQzt3QkFDbEMscUJBQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBcEQsYUFBYSxHQUFHLFNBQW9DO3dCQUMxRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxpREFBK0MsYUFBZSxDQUFDLENBQUM7NkJBRTlFLENBQUMsYUFBYSxFQUFkLHdCQUFjO3dCQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO3dCQUMzQyxxQkFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUFqRCxNQUFNLEdBQUcsU0FBd0M7d0JBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1EQUFpRCxNQUFRLENBQUMsQ0FBQzt3QkFFN0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQ2Ys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