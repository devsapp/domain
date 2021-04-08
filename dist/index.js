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
var core_1 = require("@serverless-devs/core");
var constant_1 = __importDefault(require("./constant"));
var addFcDomain_1 = __importDefault(require("./utils/addFcDomain"));
var addOssDomain_1 = __importDefault(require("./utils/addOssDomain"));
var interface_1 = require("./interface");
var Compoent = /** @class */ (function () {
    function Compoent() {
    }
    Compoent.prototype.get = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, projectName, provider, accessAlias, params, credential, addOssDomain;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = inputs.Project, projectName = _a.ProjectName, provider = _a.Provider, accessAlias = _a.AccessAlias;
                        this.logger.debug("[" + projectName + "] inputs params: " + JSON.stringify(inputs));
                        params = inputs.Properties;
                        return [4 /*yield*/, core_1.getCredential(provider, accessAlias)];
                    case 1:
                        credential = _b.sent();
                        if (!interface_1.isFcToken(params)) return [3 /*break*/, 3];
                        return [4 /*yield*/, addFcDomain_1.default.domain(params, credential)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        addOssDomain = new addOssDomain_1.default();
                        return [4 /*yield*/, addOssDomain.domain(params, credential)];
                    case 4: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    __decorate([
        core_1.HLogger(constant_1.default.CONTEXT),
        __metadata("design:type", Object)
    ], Compoent.prototype, "logger", void 0);
    return Compoent;
}());
exports.default = Compoent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBd0U7QUFFeEUsd0RBQWtDO0FBQ2xDLG9FQUE4QztBQUM5QyxzRUFBZ0Q7QUFDaEQseUNBQTZEO0FBRTdEO0lBQUE7SUFrQkEsQ0FBQztJQWZPLHNCQUFHLEdBQVQsVUFBVSxNQUFNOzs7Ozs7d0JBQ1IsS0FBNkUsTUFBTSxDQUFDLE9BQU8sRUFBNUUsV0FBVyxpQkFBQSxFQUFZLFFBQVEsY0FBQSxFQUFlLFdBQVcsaUJBQUEsQ0FBb0I7d0JBQ2xHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQUksV0FBVyx5QkFBb0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUcsQ0FBQyxDQUFDO3dCQUV6RSxNQUFNLEdBQXlCLE1BQU0sQ0FBQyxVQUFVLENBQUM7d0JBRXBDLHFCQUFNLG9CQUFhLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxFQUFBOzt3QkFBdkQsVUFBVSxHQUFHLFNBQTBDOzZCQUV6RCxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxFQUFqQix3QkFBaUI7d0JBQ1oscUJBQU0scUJBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxFQUFBOzRCQUFuRCxzQkFBTyxTQUE0QyxFQUFDOzt3QkFHaEQsWUFBWSxHQUFHLElBQUksc0JBQVksRUFBRSxDQUFDO3dCQUNqQyxxQkFBTSxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFBQTs0QkFBcEQsc0JBQU8sU0FBNkMsRUFBQzs7OztLQUN0RDtJQWhCMEI7UUFBMUIsY0FBTyxDQUFDLGtCQUFRLENBQUMsT0FBTyxDQUFDOzs0Q0FBaUI7SUFpQjdDLGVBQUM7Q0FBQSxBQWxCRCxJQWtCQztrQkFsQm9CLFFBQVEifQ==