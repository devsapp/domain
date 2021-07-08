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
var core = __importStar(require("@serverless-devs/core"));
var constant_1 = __importDefault(require("./constant"));
var addFcDomain_1 = __importDefault(require("./utils/addFcDomain"));
var addOssDomain_1 = __importDefault(require("./utils/addOssDomain"));
var addJamstack_1 = __importDefault(require("./utils/addJamstack"));
var interface_1 = require("./interface");
var logger_1 = __importDefault(require("./common/logger"));
var Compoent = /** @class */ (function () {
    function Compoent() {
    }
    Compoent.prototype.get = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, props, credential, help;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.hanlderInputs(inputs, 'get')];
                    case 1:
                        _a = _b.sent(), props = _a.props, credential = _a.credential, help = _a.help;
                        if (help) {
                            core.help(constant_1.default.HELP);
                            return [2 /*return*/];
                        }
                        if (!interface_1.isFcToken(props)) return [3 /*break*/, 3];
                        return [4 /*yield*/, addFcDomain_1.default.domain(props, credential)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        if (!interface_1.isOssToken(props)) return [3 /*break*/, 5];
                        return [4 /*yield*/, addOssDomain_1.default.domain(props, credential)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: throw new Error('Domain configuration error, please refer to https://github.com/devsapp/domain');
                }
            });
        });
    };
    Compoent.prototype.jamstack = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, props, credential, help;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.hanlderInputs(inputs, 'jamstack')];
                    case 1:
                        _a = _b.sent(), props = _a.props, credential = _a.credential, help = _a.help;
                        if (help) {
                            core.help(constant_1.default.JAM_STACK_HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, addJamstack_1.default.domain(props, credential)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    Compoent.prototype.hanlderInputs = function (inputs, command) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, credential, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        logger_1.default.setContent(constant_1.default.CONTEXT);
                        logger_1.default.debug("inputs params: " + JSON.stringify(inputs.props));
                        apts = { boolean: ['help'], alias: { help: 'h' } };
                        commandData = core.commandParse(inputs, apts);
                        logger_1.default.debug("Command data is: " + JSON.stringify(commandData));
                        if ((_a = commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core.reportComponent('domain', { uid: '', command: command });
                            return [2 /*return*/, { help: true }];
                        }
                        _b = inputs.credential;
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        credential = _b;
                        core.reportComponent('domain', {
                            uid: credential.AccountID,
                            command: command,
                        });
                        return [2 /*return*/, {
                                props: inputs.props,
                                credential: credential,
                            }];
                }
            });
        });
    };
    return Compoent;
}());
exports.default = Compoent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLHdEQUFrQztBQUNsQyxvRUFBOEM7QUFDOUMsc0VBQWdEO0FBQ2hELG9FQUE4QztBQUM5Qyx5Q0FBNkQ7QUFDN0QsMkRBQXFDO0FBRXJDO0lBQUE7SUE4REEsQ0FBQztJQTdETyxzQkFBRyxHQUFULFVBQVUsTUFBZTs7Ozs7NEJBS25CLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFBOzt3QkFKckMsS0FJRixTQUF1QyxFQUh6QyxLQUFLLFdBQUEsRUFDTCxVQUFVLGdCQUFBLEVBQ1YsSUFBSSxVQUFBO3dCQUdOLElBQUksSUFBSSxFQUFFOzRCQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDekIsc0JBQU87eUJBQ1I7NkJBRUcscUJBQVMsQ0FBQyxLQUFLLENBQUMsRUFBaEIsd0JBQWdCO3dCQUNYLHFCQUFNLHFCQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsRUFBQTs0QkFBbEQsc0JBQU8sU0FBMkMsRUFBQzs7NkJBR2pELHNCQUFVLENBQUMsS0FBSyxDQUFDLEVBQWpCLHdCQUFpQjt3QkFDWixxQkFBTSxzQkFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEVBQUE7NEJBQW5ELHNCQUFPLFNBQTRDLEVBQUM7NEJBR3RELE1BQU0sSUFBSSxLQUFLLENBQUMsK0VBQStFLENBQUMsQ0FBQzs7OztLQUNsRztJQUVLLDJCQUFRLEdBQWQsVUFBZSxNQUFlOzs7Ozs0QkFLeEIscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEVBQUE7O3dCQUoxQyxLQUlGLFNBQTRDLEVBSDlDLEtBQUssV0FBQSxFQUNMLFVBQVUsZ0JBQUEsRUFDVixJQUFJLFVBQUE7d0JBR04sSUFBSSxJQUFJLEVBQUU7NEJBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzRCQUNuQyxzQkFBTzt5QkFDUjt3QkFFTSxxQkFBTSxxQkFBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEVBQUE7NEJBQWxELHNCQUFPLFNBQTJDLEVBQUM7Ozs7S0FDcEQ7SUFFYSxnQ0FBYSxHQUEzQixVQUE0QixNQUFlLEVBQUUsT0FBZTs7Ozs7Ozt3QkFDMUQsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsa0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDcEMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsb0JBQWtCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRyxDQUFDLENBQUM7d0JBQ3pELElBQUksR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO3dCQUNuRCxXQUFXLEdBQVEsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ3pELGdCQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFvQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBRyxDQUFDLENBQUM7d0JBRWhFLFVBQUksV0FBVyxDQUFDLElBQUksMENBQUUsSUFBSSxFQUFFOzRCQUMxQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDOzRCQUNyRCxzQkFBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBQzt5QkFDdkI7d0JBQ2tCLEtBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQTtnQ0FBakIsd0JBQWlCO3dCQUFJLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQTs7OEJBQS9DLFNBQStDOzs7d0JBQWpGLFVBQVUsS0FBdUU7d0JBRXZGLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFOzRCQUM3QixHQUFHLEVBQUUsVUFBVSxDQUFDLFNBQVM7NEJBQ3pCLE9BQU8sU0FBQTt5QkFDUixDQUFDLENBQUM7d0JBRUgsc0JBQU87Z0NBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO2dDQUNuQixVQUFVLFlBQUE7NkJBQ1gsRUFBQzs7OztLQUNIO0lBQ0gsZUFBQztBQUFELENBQUMsQUE5REQsSUE4REMifQ==