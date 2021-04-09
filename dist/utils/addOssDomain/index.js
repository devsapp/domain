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
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var constant_1 = __importDefault(require("../../constant"));
var oss_1 = __importDefault(require("./oss"));
var cdn_1 = __importDefault(require("./cdn"));
var utils_1 = require("../utils");
/**
 * VerifyDomainOwner  验证域名归属权
 * DescribeVerifyContent   异常获取Content值
 * VerifyDomainOwner 再次校验
 */
var AddOssDomain = /** @class */ (function () {
    function AddOssDomain() {
    }
    AddOssDomain.prototype.domain = function (params, credential) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenRs, bucket, region, token, domain, savePath, ossCredential, cdn, cname, dRs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("The request " + constant_1.default.DOMAIN + "/token parameter is: \n " + JSON.stringify(params, null, '  ') + " ");
                        return [4 /*yield*/, core_1.request(constant_1.default.DOMAIN + "/token", {
                                method: 'post',
                                body: params,
                                form: true,
                                hint: constant_1.default.HINT,
                            })];
                    case 1:
                        tokenRs = _a.sent();
                        this.logger.debug("Get token response is: \n " + JSON.stringify(tokenRs, null, '  '));
                        utils_1.checkRs(tokenRs);
                        bucket = params.bucket, region = params.region;
                        token = tokenRs.Body.Token;
                        domain = bucket + ".oss.devsapp.cn";
                        savePath = path_1.default.join(process.cwd(), '.s', bucket + "-token");
                        this.logger.debug("Save file path is: " + savePath + ", token is: " + token + ".");
                        return [4 /*yield*/, fs_extra_1.default.outputFile(savePath, token)];
                    case 2:
                        _a.sent();
                        this.logger.debug('Put file to oss start...');
                        ossCredential = {
                            region: "oss-" + region,
                            bucket: bucket,
                            accessKeyId: credential.AccessKeyID,
                            accessKeySecret: credential.AccessKeySecret,
                        };
                        return [4 /*yield*/, oss_1.default.put(ossCredential, savePath)];
                    case 3:
                        _a.sent();
                        this.logger.debug('Put file to oss end.');
                        cdn = new cdn_1.default(credential);
                        return [4 /*yield*/, cdn.makeOwner(bucket, region, token)];
                    case 4:
                        _a.sent();
                        this.logger.debug("Add cdn domain start, domain is: " + domain);
                        return [4 /*yield*/, cdn.addCdnDomain(domain, bucket, "oss-" + region)];
                    case 5:
                        cname = _a.sent();
                        this.logger.debug('Add cdn domain end.');
                        this.logger.debug("The request " + constant_1.default.DOMAIN + "/domain parameter is: { bucket: " + bucket + ", region: " + region + ", cname: " + cname + ", token: " + token + " }");
                        return [4 /*yield*/, core_1.request(constant_1.default.DOMAIN + "/domain", {
                                method: 'post',
                                body: { bucket: bucket, region: region, token: token, type: 'oss', cname: cname },
                                form: true,
                                hint: __assign(__assign({}, constant_1.default.HINT), { loading: 'Get domain....' }),
                            })];
                    case 6:
                        dRs = _a.sent();
                        this.logger.debug("The request " + constant_1.default.DOMAIN + "/verify response is: \n " + JSON.stringify(dRs, null, '  '));
                        return [4 /*yield*/, fs_extra_1.default.remove(savePath)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, domain];
                }
            });
        });
    };
    __decorate([
        core_1.HLogger(constant_1.default.CONTEXT),
        __metadata("design:type", Object)
    ], AddOssDomain.prototype, "logger", void 0);
    return AddOssDomain;
}());
exports.default = AddOssDomain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvYWRkT3NzRG9tYWluL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBa0U7QUFFbEUsc0RBQTBCO0FBQzFCLDhDQUF3QjtBQUN4Qiw0REFBc0M7QUFDdEMsOENBQXdCO0FBQ3hCLDhDQUF3QjtBQUN4QixrQ0FBbUM7QUFFbkM7Ozs7R0FJRztBQUVIO0lBQUE7SUE2REEsQ0FBQztJQTFETyw2QkFBTSxHQUFaLFVBQWEsTUFBaUIsRUFBRSxVQUFlOzs7Ozs7d0JBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUNmLGlCQUFlLGtCQUFRLENBQUMsTUFBTSxnQ0FBMkIsSUFBSSxDQUFDLFNBQVMsQ0FDckUsTUFBTSxFQUNOLElBQUksRUFDSixJQUFJLENBQ0wsTUFBRyxDQUNMLENBQUM7d0JBQ2MscUJBQU0sY0FBTyxDQUFJLGtCQUFRLENBQUMsTUFBTSxXQUFRLEVBQUU7Z0NBQ3hELE1BQU0sRUFBRSxNQUFNO2dDQUNkLElBQUksRUFBRSxNQUFNO2dDQUNaLElBQUksRUFBRSxJQUFJO2dDQUNWLElBQUksRUFBRSxrQkFBUSxDQUFDLElBQUk7NkJBQ3BCLENBQUMsRUFBQTs7d0JBTEksT0FBTyxHQUFHLFNBS2Q7d0JBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0JBQTZCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUcsQ0FBQyxDQUFDO3dCQUN0RixlQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBRVQsTUFBTSxHQUFhLE1BQU0sT0FBbkIsRUFBRSxNQUFNLEdBQUssTUFBTSxPQUFYLENBQVk7d0JBQzVCLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtB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