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
var fs_extra_1 = __importDefault(require("fs-extra"));
var core_1 = require("@serverless-devs/core");
var logger_1 = __importDefault(require("../../common/logger"));
var api = __importStar(require("../api"));
var utils_1 = require("../utils");
var oss_1 = __importDefault(require("../oss"));
var cdn_1 = __importDefault(require("../cdn"));
var fc_1 = __importDefault(require("../fc"));
var JAMSTACK_OSS = 'jamstack-oss';
var JAMSTACK_FC = 'jamstack-fc';
var AddJamstack = /** @class */ (function () {
    function AddJamstack() {
    }
    AddJamstack.domain = function (params, credential) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(params.type === JAMSTACK_OSS)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.jamstackOss(params, credential)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (!(params.type === JAMSTACK_FC)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.jamstackFc(params, credential)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: throw new Error('Domain configuration error, please refer to https://github.com/devsapp/domain');
                }
            });
        });
    };
    AddJamstack.jamstackFc = function (params, credential) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenRs, _a, token, _b, domain, vm, ex_1, sources, domainParams, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, api.token(params)];
                    case 1:
                        tokenRs = _d.sent();
                        _a = tokenRs.Body, token = _a.Token, _b = _a.Domain, domain = _b === void 0 ? '' : _b;
                        vm = core_1.spinner('Deploy helper function.');
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, fc_1.default.deploy(credential, params.region, token)];
                    case 3:
                        _d.sent();
                        return [4 /*yield*/, utils_1.sleep(1500)];
                    case 4:
                        _d.sent();
                        vm.succeed('Deployed.');
                        return [3 /*break*/, 6];
                    case 5:
                        ex_1 = _d.sent();
                        vm.fail('Failed to deploy helper function.');
                        throw ex_1;
                    case 6:
                        sources = [
                            { type: 'fc_domain', port: 80, content: params.customDomain },
                        ];
                        if (params.bucket) {
                            sources.push({ type: 'oss', port: 80, content: params.bucket + ".oss-" + params.region + ".aliyuncs.com" });
                        }
                        domainParams = __assign(__assign({}, params), { token: token });
                        _c = domainParams;
                        return [4 /*yield*/, this.addCdnDomain(credential, domainParams, domain, sources)];
                    case 7:
                        _c.cname = _d.sent();
                        return [4 /*yield*/, api.domain(domainParams)];
                    case 8:
                        _d.sent();
                        return [4 /*yield*/, fc_1.default.remove(credential, params.region)];
                    case 9:
                        _d.sent();
                        return [2 /*return*/, domain];
                }
            });
        });
    };
    AddJamstack.jamstackOss = function (params, credential) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenRs, bucket, region, customDomain, _a, token, _b, domain, savePath, sources, domainParams, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, api.token(params)];
                    case 1:
                        tokenRs = _d.sent();
                        bucket = params.bucket, region = params.region, customDomain = params.customDomain;
                        _a = tokenRs.Body, token = _a.Token, _b = _a.Domain, domain = _b === void 0 ? '' : _b;
                        return [4 /*yield*/, oss_1.default.saveFile(bucket, token)];
                    case 2:
                        savePath = _d.sent();
                        logger_1.default.debug('Put file to oss start...');
                        return [4 /*yield*/, oss_1.default.put(region, bucket, credential, savePath)];
                    case 3:
                        _d.sent();
                        logger_1.default.debug('Put file to oss end.');
                        sources = [
                            { type: 'oss', port: 80, content: bucket + ".oss-" + region + ".aliyuncs.com" },
                        ];
                        if (customDomain) {
                            sources.push({ type: 'fc_domain', port: 80, content: params.customDomain });
                        }
                        domainParams = __assign(__assign({}, params), { token: token });
                        _c = domainParams;
                        return [4 /*yield*/, this.addCdnDomain(credential, domainParams, domain, sources)];
                    case 4:
                        _c.cname = _d.sent();
                        return [4 /*yield*/, api.domain(domainParams)];
                    case 5:
                        _d.sent();
                        return [4 /*yield*/, fs_extra_1.default.remove(savePath)];
                    case 6:
                        _d.sent();
                        return [2 /*return*/, domain];
                }
            });
        });
    };
    AddJamstack.addCdnDomain = function (credential, domainParams, domain, sources) {
        return __awaiter(this, void 0, void 0, function () {
            var cdn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cdn = new cdn_1.default(credential);
                        return [4 /*yield*/, cdn.makeOwner(domainParams, { jamstack: domain.split('.')[0] })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, cdn.mackCdnDomain(domain, sources)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return AddJamstack;
}());
exports.default = AddJamstack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvYWRkSmFtc3RhY2svaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBMEI7QUFDMUIsOENBQWdEO0FBQ2hELCtEQUF5QztBQUN6QywwQ0FBOEI7QUFFOUIsa0NBQWlDO0FBQ2pDLCtDQUF5QjtBQUN6QiwrQ0FBeUI7QUFDekIsNkNBQXVCO0FBRXZCLElBQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQztBQUNwQyxJQUFNLFdBQVcsR0FBRyxhQUFhLENBQUM7QUFFbEM7SUFBQTtJQTJFQSxDQUFDO0lBMUVjLGtCQUFNLEdBQW5CLFVBQW9CLE1BQWlCLEVBQUUsVUFBd0I7Ozs7OzZCQUN6RCxDQUFBLE1BQU0sQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFBLEVBQTVCLHdCQUE0Qjt3QkFDdkIscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEVBQUE7NEJBQWpELHNCQUFPLFNBQTBDLEVBQUM7OzZCQUN6QyxDQUFBLE1BQU0sQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFBLEVBQTNCLHdCQUEyQjt3QkFDN0IscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEVBQUE7NEJBQWhELHNCQUFPLFNBQXlDLEVBQUM7NEJBR25ELE1BQU0sSUFBSSxLQUFLLENBQUMsK0VBQStFLENBQUMsQ0FBQzs7OztLQUNsRztJQUVZLHNCQUFVLEdBQXZCLFVBQXdCLE1BQWlCLEVBQUUsVUFBd0I7Ozs7OzRCQUNqRCxxQkFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBakMsT0FBTyxHQUFHLFNBQXVCO3dCQUNqQyxLQUdGLE9BQU8sQ0FBQyxJQUFJLEVB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