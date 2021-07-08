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
var fs_extra_1 = __importDefault(require("fs-extra"));
var logger_1 = __importDefault(require("../../common/logger"));
var oss_1 = __importDefault(require("../oss"));
var cdn_1 = __importDefault(require("../cdn"));
var api = __importStar(require("../api"));
/**
 * VerifyDomainOwner  验证域名归属权
 * DescribeVerifyContent   异常获取Content值
 * VerifyDomainOwner 再次校验
 */
var AddOssDomain = /** @class */ (function () {
    function AddOssDomain() {
    }
    AddOssDomain.domain = function (params, credential) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenRs, bucket, region, token, domain, savePath, cdn, sources, cname;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.token(params)];
                    case 1:
                        tokenRs = _a.sent();
                        bucket = params.bucket, region = params.region;
                        token = tokenRs.Body.Token;
                        domain = bucket + ".oss.devsapp.net";
                        return [4 /*yield*/, oss_1.default.saveFile(bucket, token)];
                    case 2:
                        savePath = _a.sent();
                        logger_1.default.debug('Put file to oss start...');
                        return [4 /*yield*/, oss_1.default.put(region, bucket, credential, savePath)];
                    case 3:
                        _a.sent();
                        logger_1.default.debug('Put file to oss end.');
                        cdn = new cdn_1.default(credential);
                        return [4 /*yield*/, cdn.makeOwner({ bucket: bucket, region: region, token: token, type: 'oss' }, { bucket: bucket })];
                    case 4:
                        _a.sent();
                        logger_1.default.debug("Add cdn domain start, domain is: " + domain);
                        sources = [
                            { type: 'oss', port: 80, content: bucket + ".oss-" + region + ".aliyuncs.com" },
                        ];
                        return [4 /*yield*/, cdn.mackCdnDomain(domain, sources)];
                    case 5:
                        cname = _a.sent();
                        logger_1.default.debug('Add cdn domain end.');
                        return [4 /*yield*/, api.domain({ bucket: bucket, region: region, token: token, type: 'oss', cname: cname })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, fs_extra_1.default.remove(savePath)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, domain];
                }
            });
        });
    };
    return AddOssDomain;
}());
exports.default = AddOssDomain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvYWRkT3NzRG9tYWluL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUEwQjtBQUMxQiwrREFBeUM7QUFDekMsK0NBQXlCO0FBQ3pCLCtDQUF5QjtBQUN6QiwwQ0FBOEI7QUFFOUI7Ozs7R0FJRztBQUVIO0lBQUE7SUE0QkEsQ0FBQztJQTNCYyxtQkFBTSxHQUFuQixVQUFvQixNQUFpQixFQUFFLFVBQWU7Ozs7OzRCQUNwQyxxQkFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBakMsT0FBTyxHQUFHLFNBQXVCO3dCQUUvQixNQUFNLEdBQWEsTUFBTSxPQUFuQixFQUFFLE1BQU0sR0FBSyxNQUFNLE9BQVgsQ0FBWTt3QkFDNUIsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUMzQixNQUFNLEdBQU0sTUFBTSxxQkFBa0IsQ0FBQzt3QkFDMUIscUJBQU0sYUFBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUE7O3dCQUE1QyxRQUFRLEdBQUcsU0FBaUM7d0JBRWxELGdCQUFNLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7d0JBQ3pDLHFCQUFNLGFBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLEVBQUE7O3dCQUFuRCxTQUFtRCxDQUFDO3dCQUNwRCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO3dCQUUvQixHQUFHLEdBQUcsSUFBSSxhQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ2hDLHFCQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLFFBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDLEVBQUE7O3dCQUF2RSxTQUF1RSxDQUFDO3dCQUN4RSxnQkFBTSxDQUFDLEtBQUssQ0FBQyxzQ0FBb0MsTUFBUSxDQUFDLENBQUM7d0JBQ3JELE9BQU8sR0FBRzs0QkFDZCxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUssTUFBTSxhQUFRLE1BQU0sa0JBQWUsRUFBRTt5QkFDM0UsQ0FBQzt3QkFDWSxxQkFBTSxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBQTs7d0JBQWhELEtBQUssR0FBRyxTQUF3Qzt3QkFDdEQsZ0JBQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQzt3QkFFcEMscUJBQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sUUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLEtBQUssT0FBQSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQyxFQUFBOzt3QkFBL0QsU0FBK0QsQ0FBQzt3QkFFaEUscUJBQU0sa0JBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUE7O3dCQUF6QixTQUF5QixDQUFDO3dCQUUxQixzQkFBTyxNQUFNLEVBQUM7Ozs7S0FDZjtJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQTVCRCxJQTRCQyJ9