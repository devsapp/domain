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
var utils_1 = require("../utils");
var constant_1 = __importDefault(require("../../constant"));
var fc_1 = __importDefault(require("./fc"));
var AddFcDomain = /** @class */ (function () {
    function AddFcDomain() {
    }
    AddFcDomain.domain = function (params, credential) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenRs, token, vm, domainRs;
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
                        token = tokenRs.Body.Token;
                        vm = core_1.spinner('Deploy helper function.');
                        return [4 /*yield*/, fc_1.default.deploy(credential, params.region, token)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, utils_1.sleep(1500)];
                    case 3:
                        _a.sent();
                        vm.succeed('Deployed.');
                        this.logger.debug("The request " + constant_1.default.DOMAIN + "/domain parameter is: \n " + JSON.stringify(__assign(__assign({}, params), { token: token }), null, '  ') + " ");
                        return [4 /*yield*/, core_1.request(constant_1.default.DOMAIN + "/domain", {
                                method: 'post',
                                body: __assign(__assign({}, params), { token: token }),
                                form: true,
                                hint: __assign(__assign({}, constant_1.default.HINT), { loading: 'Get domain....' }),
                            })];
                    case 4:
                        domainRs = _a.sent();
                        this.logger.debug("Get token response is: \n " + JSON.stringify(domainRs, null, '  '));
                        return [4 /*yield*/, fc_1.default.remove(credential, params.region)];
                    case 5:
                        _a.sent();
                        utils_1.checkRs(domainRs);
                        return [2 /*return*/, (params.function + "." + params.service + "." + params.region + "." + params.user + ".fc.devsapp.cn").toLocaleLowerCase()];
                }
            });
        });
    };
    __decorate([
        core_1.HLogger(constant_1.default.CONTEXT),
        __metadata("design:type", Object)
    ], AddFcDomain, "logger", void 0);
    return AddFcDomain;
}());
exports.default = AddFcDomain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvYWRkRmNEb21haW4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUEyRTtBQUUzRSxrQ0FBMEM7QUFDMUMsNERBQXNDO0FBQ3RDLDRDQUFzQjtBQUd0QjtJQUFBO0lBOENBLENBQUM7SUEzQ2Msa0JBQU0sR0FBbkIsVUFBb0IsTUFBZ0IsRUFBRSxVQUFVOzs7Ozs7d0JBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUNmLGlCQUFlLGtCQUFRLENBQUMsTUFBTSxnQ0FBMkIsSUFBSSxDQUFDLFNBQVMsQ0FDckUsTUFBTSxFQUNOLElBQUksRUFDSixJQUFJLENBQ0wsTUFBRyxDQUNMLENBQUM7d0JBQ2MscUJBQU0sY0FBTyxDQUFJLGtCQUFRLENBQUMsTUFBTSxXQUFRLEVBQUU7Z0NBQ3hELE1BQU0sRUFBRSxNQUFNO2dDQUNkLElBQUksRUFBRSxNQUFNO2dDQUNaLElBQUksRUFBRSxJQUFJO2dDQUNWLElBQUksRUFBRSxrQkFBUSxDQUFDLElBQUk7NkJBQ3BCLENBQUMsRUFBQTs7d0JBTEksT0FBTyxHQUFHLFNBS2Q7d0JBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0JBQTZCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUcsQ0FBQyxDQUFDO3dCQUN0RixlQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBRVgsS0FBSyxHQUFXLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUVuQyxFQUFFLEdBQUcsY0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7d0JBQzlDLHFCQUFNLFlBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUE7O3dCQUFqRCxTQUFpRCxDQUFDO3dCQUNsRCxxQkFBTSxhQUFLLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUFqQixTQUFpQixDQUFDO3dCQUNsQixFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUV4QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDZixpQkFBZSxrQkFBUSxDQUFDLE1BQU0saUNBQTRCLElBQUksQ0FBQyxTQUFTLHVCQUNqRSxNQUFNLEtBQUUsS0FBSyxPQUFBLEtBQ2xCLElBQUksRUFDSixJQUFJLENBQ0wsTUFBRyxDQUNMLENBQUM7d0JBQ2UscUJBQU0sY0FBTyxDQUFJLGtCQUFRLENBQUMsTUFBTSxZQUFTLEVBQUU7Z0NBQzFELE1BQU0sRUFBRSxNQUFNO2dDQUNkLElBQUksd0JBQU8sTUFBTSxLQUFFLEtBQUssT0FBQSxHQUFFO2dDQUMxQixJQUFJLEVBQUUsSUFBSTtnQ0FDVixJQUFJLHdCQUFPLGtCQUFRLENBQUMsSUFBSSxLQUFFLE9BQU8sRUFBRSxnQkFBZ0IsR0FBRTs2QkFDdEQsQ0FBQyxFQUFBOzt3QkFMSSxRQUFRLEdBQUcsU0FLZjt3QkFFRixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywrQkFBNkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBRyxDQUFDLENBQUM7d0JBQ3ZGLHFCQUFNLFlBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQTFDLFNBQTBDLENBQUM7d0JBQzNDLGVBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDbEIsc0JBQU8sQ0FBRyxNQUFNLENBQUMsUUFBUSxTQUFJLE1BQU0sQ0FBQyxPQUFPLFNBQUksTUFBTSxDQUFDLE1BQU0sU0FBSSxNQUFNLENBQUMsSUFBSSxtQkFBZ0IsQ0FBQSxDQUFDLGlCQUFpQixFQUFFLEVBQUM7Ozs7S0FDakg7SUE1QzBCO1FBQTFCLGNBQU8sQ0FBQyxrQkFBUSxDQUFDLE9BQU8sQ0FBQzs7cUNBQXdCO0lBNkNwRCxrQkFBQztDQUFBLEFBOUNELElBOENDO2tCQTlDb0IsV0FBVyJ9