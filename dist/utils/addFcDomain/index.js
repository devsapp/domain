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
var core_1 = require("@serverless-devs/core");
var utils_1 = require("../utils");
var lodash_1 = __importDefault(require("lodash"));
var fc_1 = __importDefault(require("../fc"));
var api = __importStar(require("../api"));
var AddFcDomain = /** @class */ (function () {
    function AddFcDomain() {
    }
    AddFcDomain.domain = function (params, credential) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, tokenRs, token, vm, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.getFcEndpoint()];
                    case 1:
                        endpoint = _a.sent();
                        if (!lodash_1.default.isNil(endpoint)) {
                            params.endpoint = endpoint;
                        }
                        return [4 /*yield*/, api.token(params)];
                    case 2:
                        tokenRs = _a.sent();
                        token = tokenRs.Body.Token;
                        vm = core_1.spinner('Deploy helper function.');
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, fc_1.default.deploy(credential, params.region, token)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, utils_1.sleep(1500)];
                    case 5:
                        _a.sent();
                        vm.succeed('Deployed.');
                        return [3 /*break*/, 7];
                    case 6:
                        ex_1 = _a.sent();
                        vm.fail('Failed to deploy helper function.');
                        throw ex_1;
                    case 7: return [4 /*yield*/, api.domain(__assign(__assign({}, params), { token: token }))];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, fc_1.default.remove(credential, params.region)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/, tokenRs.Body.Domain || (params.function + "." + params.service + "." + params.user + "." + params.region + ".fc.devsapp.net").toLocaleLowerCase()];
                }
            });
        });
    };
    return AddFcDomain;
}());
exports.default = AddFcDomain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvYWRkRmNEb21haW4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBZ0Q7QUFDaEQsa0NBQWdEO0FBQ2hELGtEQUF1QjtBQUN2Qiw2Q0FBdUI7QUFDdkIsMENBQThCO0FBRzlCO0lBQUE7SUF5QkEsQ0FBQztJQXhCYyxrQkFBTSxHQUFuQixVQUFvQixNQUFnQixFQUFFLFVBQVU7Ozs7OzRCQUM3QixxQkFBTSxxQkFBYSxFQUFFLEVBQUE7O3dCQUFoQyxRQUFRLEdBQUcsU0FBcUI7d0JBQ3RDLElBQUksQ0FBQyxnQkFBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTs0QkFDdEIsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7eUJBQzVCO3dCQUNlLHFCQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUFqQyxPQUFPLEdBQUcsU0FBdUI7d0JBRWpDLEtBQUssR0FBVyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzt3QkFFbkMsRUFBRSxHQUFHLGNBQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOzs7O3dCQUU1QyxxQkFBTSxZQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFBOzt3QkFBakQsU0FBaUQsQ0FBQzt3QkFDbEQscUJBQU0sYUFBSyxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBakIsU0FBaUIsQ0FBQzt3QkFDbEIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Ozt3QkFFeEIsRUFBRSxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO3dCQUM3QyxNQUFNLElBQUUsQ0FBQzs0QkFHWCxxQkFBTSxHQUFHLENBQUMsTUFBTSx1QkFBTSxNQUFNLEtBQUUsS0FBSyxPQUFBLElBQUcsRUFBQTs7d0JBQXRDLFNBQXNDLENBQUM7d0JBRXZDLHFCQUFNLFlBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQTFDLFNBQTBDLENBQUM7d0JBQzNDLHNCQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUcsTUFBTSxDQUFDLFFBQVEsU0FBSSxNQUFNLENBQUMsT0FBTyxTQUFJLE1BQU0sQ0FBQyxJQUFJLFNBQUksTUFBTSxDQUFDLE1BQU0sb0JBQWlCLENBQUEsQ0FBQyxpQkFBaUIsRUFBRSxFQUFDOzs7O0tBQ3pJO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBekJELElBeUJDIn0=