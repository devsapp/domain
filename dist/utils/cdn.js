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
/* eslint-disable no-await-in-loop */
var core_1 = require("@serverless-devs/core");
var logger_1 = __importDefault(require("../common/logger"));
var utils_1 = require("./utils");
var api = __importStar(require("./api"));
var POST = { method: 'POST' };
var DOMAIN = 'devsapp.net';
var Cdn = /** @class */ (function () {
    function Cdn(credentials) {
        this.cdnClient = utils_1.getPopClient(credentials, 'https://cdn.aliyuncs.com', '2018-05-10');
    }
    Cdn.prototype.makeOwner = function (domainParams, verifyParams) {
        return __awaiter(this, void 0, void 0, function () {
            var isDomainOwner, verify;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.default.debug('Check verify domain owner start...');
                        return [4 /*yield*/, this.verifyDomainOwner(DOMAIN)];
                    case 1:
                        isDomainOwner = _a.sent();
                        logger_1.default.debug("Check verify domain owner end, response is: " + isDomainOwner);
                        if (!!isDomainOwner) return [3 /*break*/, 7];
                        logger_1.default.debug('Get describe verify content start...');
                        return [4 /*yield*/, this.describeVerifyContent(DOMAIN)];
                    case 2:
                        verify = _a.sent();
                        logger_1.default.debug("Get describe verify content end, response is: " + verify);
                        return [4 /*yield*/, api.domain(domainParams)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, api.verify(__assign(__assign({}, verifyParams), { verify: verify }))];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, utils_1.sleep(1000)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.makeOwner(domainParams, verifyParams)];
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
                        logger_1.default.debug("VerifyDomainOwner domain name is " + domainName + ", error is: \n " + ex_1);
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
    Cdn.prototype.mackCdnDomain = function (domain, sources) {
        return __awaiter(this, void 0, void 0, function () {
            var cname;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.default.debug("Add cdn domain start, domain is: " + domain);
                        return [4 /*yield*/, this.hasDomainName(domain)];
                    case 1:
                        cname = _a.sent();
                        logger_1.default.debug("has cname: " + cname);
                        if (!cname) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.modifyCdnDomain(domain, sources)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.addCdnDomain(domain, sources)];
                    case 4:
                        cname = _a.sent();
                        _a.label = 5;
                    case 5:
                        logger_1.default.debug("Add cdn domain end. cname: " + cname);
                        return [2 /*return*/, cname];
                }
            });
        });
    };
    Cdn.prototype.hasDomainName = function (domainName) {
        return __awaiter(this, void 0, void 0, function () {
            var pageSize, pageNumber, totalCount, _a, Domains, TotalCount, _i, _b, _c, Cname, DomainName;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        pageSize = 50;
                        pageNumber = 0;
                        totalCount = 0;
                        _d.label = 1;
                    case 1:
                        pageNumber = pageNumber + 1;
                        return [4 /*yield*/, this.cdnClient.request('DescribeUserDomains', {
                                pageSize: pageSize, pageNumber: pageNumber,
                            }, POST)];
                    case 2:
                        _a = _d.sent(), Domains = _a.Domains, TotalCount = _a.TotalCount;
                        logger_1.default.debug("DescribeUserDomains responses: " + JSON.stringify(Domains));
                        for (_i = 0, _b = ((Domains === null || Domains === void 0 ? void 0 : Domains.PageData) || []); _i < _b.length; _i++) {
                            _c = _b[_i], Cname = _c.Cname, DomainName = _c.DomainName;
                            if (DomainName === domainName) {
                                return [2 /*return*/, Cname];
                            }
                        }
                        totalCount = TotalCount;
                        _d.label = 3;
                    case 3:
                        if (totalCount >= pageNumber * pageSize) return [3 /*break*/, 1];
                        _d.label = 4;
                    case 4: return [2 /*return*/, false];
                }
            });
        });
    };
    Cdn.prototype.modifyCdnDomain = function (domainName, sources) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.cdnClient.request('ModifyCdnDomain', {
                                DomainName: domainName,
                                Sources: JSON.stringify(sources),
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
    Cdn.prototype.addCdnDomain = function (domainName, sources) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3, vm, cname, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.cdnClient.request('AddCdnDomain', {
                                DomainName: domainName,
                                Scope: 'global',
                                CdnType: 'web',
                                Sources: JSON.stringify(sources),
                            }, POST)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        if (ex_3.code !== 'DomainAlreadyExist') {
                            throw ex_3;
                        }
                        return [3 /*break*/, 3];
                    case 3:
                        vm = core_1.spinner('get cdn cname...');
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.cdnDomainDetail(domainName, 0)];
                    case 5:
                        cname = _a.sent();
                        vm.succeed();
                        return [2 /*return*/, cname];
                    case 6:
                        ex_4 = _a.sent();
                        vm.fail();
                        throw ex_4;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Cdn.prototype.cdnDomainDetail = function (domainName, i) {
        return __awaiter(this, void 0, void 0, function () {
            var describeCdnDomainDetail, cname;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cdnClient.request('DescribeCdnDomainDetail', { DomainName: domainName }, POST)];
                    case 1:
                        describeCdnDomainDetail = _a.sent();
                        logger_1.default.debug("DescribeCdnDomainDetail response is: " + JSON.stringify(describeCdnDomainDetail));
                        cname = describeCdnDomainDetail.GetDomainDetailModel.Cname;
                        if (!!cname) return [3 /*break*/, 3];
                        if (i > 90) {
                            throw new Error('Not found cdn cname, please retry.');
                        }
                        return [4 /*yield*/, utils_1.sleep(1000)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.cdnDomainDetail(domainName, i + 1)];
                    case 3: return [2 /*return*/, cname];
                }
            });
        });
    };
    return Cdn;
}());
exports.default = Cdn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2Nkbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFxQztBQUNyQyw4Q0FBZ0Q7QUFDaEQsNERBQXNDO0FBQ3RDLGlDQUE4QztBQUU5Qyx5Q0FBNkI7QUFFN0IsSUFBTSxJQUFJLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDaEMsSUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDO0FBRTdCO0lBR0UsYUFBWSxXQUF5QjtRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLG9CQUFZLENBQUMsV0FBVyxFQUFFLDBCQUEwQixFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFSyx1QkFBUyxHQUFmLFVBQWdCLFlBQWlCLEVBQUUsWUFBWTs7Ozs7O3dCQUM3QyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO3dCQUM3QixxQkFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUFwRCxhQUFhLEdBQUcsU0FBb0M7d0JBQzFELGdCQUFNLENBQUMsS0FBSyxDQUFDLGlEQUErQyxhQUFlLENBQUMsQ0FBQzs2QkFFekUsQ0FBQyxhQUFhLEVBQWQsd0JBQWM7d0JBQ2hCLGdCQUFNLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7d0JBQ3RDLHFCQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQWpELE1BQU0sR0FBRyxTQUF3Qzt3QkFDdkQsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsbURBQWlELE1BQVEsQ0FBQyxDQUFDO3dCQUV4RSxxQkFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFBOzt3QkFBOUIsU0FBOEIs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