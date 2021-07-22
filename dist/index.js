"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var lodash_1 = __importDefault(require("lodash"));
var base_1 = __importDefault(require("./common/base"));
var constant_1 = __importDefault(require("./constant"));
var addFcDomain_1 = __importDefault(require("./utils/addFcDomain"));
var addOssDomain_1 = __importDefault(require("./utils/addOssDomain"));
var addJamstack_1 = __importDefault(require("./utils/addJamstack"));
var interface_1 = require("./interface");
var logger_1 = __importDefault(require("./common/logger"));
var DOMAIN_DB = {
    name: 'domain',
    access: '',
    content: {
        domain: '',
    },
};
var Compoent = /** @class */ (function (_super) {
    __extends(Compoent, _super);
    function Compoent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Compoent.prototype.get = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, props, credential, help, domain, domain;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.hanlderInputs(inputs, 'get')];
                    case 1:
                        _b = _c.sent(), props = _b.props, credential = _b.credential, help = _b.help;
                        if (help) {
                            core.help(constant_1.default.HELP);
                            return [2 /*return*/];
                        }
                        DOMAIN_DB.access = (_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access;
                        if (!interface_1.isFcToken(props)) return [3 /*break*/, 3];
                        return [4 /*yield*/, addFcDomain_1.default.domain(props, credential)];
                    case 2:
                        domain = _c.sent();
                        DOMAIN_DB.content.domain = domain;
                        _super.prototype.__report.call(this, DOMAIN_DB);
                        return [2 /*return*/, domain];
                    case 3:
                        if (!interface_1.isOssToken(props)) return [3 /*break*/, 5];
                        return [4 /*yield*/, addOssDomain_1.default.domain(props, credential)];
                    case 4:
                        domain = _c.sent();
                        DOMAIN_DB.content.domain = domain;
                        _super.prototype.__report.call(this, DOMAIN_DB);
                        return [2 /*return*/, domain];
                    case 5: throw new Error('Domain configuration error, please refer to https://github.com/devsapp/domain');
                }
            });
        });
    };
    Compoent.prototype.jamstack = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, props, credential, help, domain;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.hanlderInputs(inputs, 'jamstack')];
                    case 1:
                        _b = _c.sent(), props = _b.props, credential = _b.credential, help = _b.help;
                        if (help) {
                            core.help(constant_1.default.JAM_STACK_HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, addJamstack_1.default.domain(props, credential)];
                    case 2:
                        domain = _c.sent();
                        DOMAIN_DB.content.domain = domain;
                        DOMAIN_DB.access = (_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access;
                        _super.prototype.__report.call(this, DOMAIN_DB);
                        return [2 /*return*/, domain];
                }
            });
        });
    };
    Compoent.prototype.hanlderInputs = function (inputs, command) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, credential;
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
                        credential = inputs.credential;
                        if (!lodash_1.default.isEmpty(inputs.credential)) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.getCredential((_b = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _b === void 0 ? void 0 : _b.access)];
                    case 1:
                        credential = _c.sent();
                        _c.label = 2;
                    case 2:
                        core.reportComponent('domain', {
                            uid: credential.AccountID,
                            command: command,
                        });
                        return [2 /*return*/, {
                                props: lodash_1.default.mapValues(inputs.props || {}, function (value) { return value.toString().replace(/_/g, '-').toLocaleLowerCase(); }),
                                credential: credential,
                            }];
                }
            });
        });
    };
    return Compoent;
}(base_1.default));
exports.default = Compoent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUE4QztBQUM5QyxrREFBdUI7QUFDdkIsdURBQWlDO0FBQ2pDLHdEQUFrQztBQUNsQyxvRUFBOEM7QUFDOUMsc0VBQWdEO0FBQ2hELG9FQUE4QztBQUM5Qyx5Q0FBNkQ7QUFDN0QsMkRBQXFDO0FBRXJDLElBQU0sU0FBUyxHQUFHO0lBQ2hCLElBQUksRUFBRSxRQUFRO0lBQ2QsTUFBTSxFQUFFLEVBQUU7SUFDVixPQUFPLEVBQUU7UUFDUCxNQUFNLEVBQUUsRUFBRTtLQUNYO0NBQ0YsQ0FBQztBQUVGO0lBQXNDLDRCQUFJO0lBQTFDOztJQTRFQSxDQUFDO0lBM0VPLHNCQUFHLEdBQVQsVUFBVSxNQUFlOzs7Ozs7NEJBS25CLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFBOzt3QkFKckMsS0FJRixTQUF1QyxFQUh6QyxLQUFLLFdBQUEsRUFDTCxVQUFVLGdCQUFBLEVBQ1YsSUFBSSxVQUFBO3dCQUdOLElBQUksSUFBSSxFQUFFOzRCQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDekIsc0JBQU87eUJBQ1I7d0JBQ0QsU0FBUyxDQUFDLE1BQU0sU0FBRyxNQUFNLENBQUMsT0FBTywwQ0FBRSxNQUFNLENBQUM7NkJBRXRDLHFCQUFTLENBQUMsS0FBSyxDQUFDLEVBQWhCLHdCQUFnQjt3QkFDSCxxQkFBTSxxQkFBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEVBQUE7O3dCQUFwRCxNQUFNLEdBQUcsU0FBMkM7d0JBQzFELFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFH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