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
exports.verify = exports.domain = exports.token = void 0;
var core_1 = require("@serverless-devs/core");
var logger_1 = __importDefault(require("../common/logger"));
var DOMAIN = 'http://domain.devsapp.net';
var HINT = {
    loading: 'Get token....',
    success: 'End of request',
    error: 'Request failed',
};
function checkRs(rs) {
    if (rs.Status !== 'Success') {
        throw new Error(rs.Body);
    }
}
function token(params) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenRs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.default.debug("The request **/token parameter is: " + JSON.stringify(params));
                    return [4 /*yield*/, core_1.request(DOMAIN + "/token", {
                            method: 'post',
                            body: params,
                            form: true,
                            hint: HINT,
                        })];
                case 1:
                    tokenRs = _a.sent();
                    logger_1.default.debug("Get token response is: " + JSON.stringify(tokenRs));
                    checkRs(tokenRs);
                    return [2 /*return*/, tokenRs];
            }
        });
    });
}
exports.token = token;
function domain(params) {
    return __awaiter(this, void 0, void 0, function () {
        var dRs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.default.debug("The request **/domain parameter is: " + JSON.stringify(params));
                    return [4 /*yield*/, core_1.request(DOMAIN + "/domain", {
                            method: 'post',
                            body: params,
                            form: true,
                            hint: __assign(__assign({}, HINT), { loading: 'Get domain....' }),
                        })];
                case 1:
                    dRs = _a.sent();
                    logger_1.default.debug("The request **/domain response is: " + JSON.stringify(dRs));
                    checkRs(dRs);
                    return [2 /*return*/, dRs];
            }
        });
    });
}
exports.domain = domain;
function verify(params) {
    return __awaiter(this, void 0, void 0, function () {
        var rs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.default.debug("The request **/verify parameter is: " + JSON.stringify(params));
                    return [4 /*yield*/, core_1.request(DOMAIN + "/verify", {
                            method: 'post',
                            body: params,
                            form: true,
                            hint: __assign(__assign({}, HINT), { loading: 'Request verify....' }),
                        })];
                case 1:
                    rs = _a.sent();
                    logger_1.default.debug("The request **/verify response is: " + JSON.stringify(rs));
                    checkRs(rs);
                    return [2 /*return*/, rs];
            }
        });
    });
}
exports.verify = verify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUFnRDtBQUVoRCw0REFBc0M7QUFFdEMsSUFBTSxNQUFNLEdBQUcsMkJBQTJCLENBQUM7QUFDM0MsSUFBTSxJQUFJLEdBQUc7SUFDWCxPQUFPLEVBQUUsZUFBZTtJQUN4QixPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLEtBQUssRUFBRSxnQkFBZ0I7Q0FDeEIsQ0FBQztBQUNGLFNBQVMsT0FBTyxDQUFDLEVBQU87SUFDdEIsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtRQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxQjtBQUNILENBQUM7QUFFRCxTQUFzQixLQUFLLENBQUMsTUFBd0M7Ozs7OztvQkFDbEUsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsd0NBQXNDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFHLENBQUMsQ0FBQztvQkFDN0QscUJBQU0sY0FBTyxDQUFJLE1BQU0sV0FBUSxFQUFFOzRCQUMvQyxNQUFNLEVBQUUsTUFBTTs0QkFDZCxJQUFJLEVBQUUsTUFBTTs0QkFDWixJQUFJLEVBQUUsSUFBSTs0QkFDVixJQUFJLEVBQUUsSUFBSTt5QkFDWCxDQUFDLEVBQUE7O29CQUxJLE9BQU8sR0FBRyxTQUtkO29CQUNGLGdCQUFNLENBQUMsS0FBSyxDQUFDLDRCQUEwQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBRyxDQUFDLENBQUM7b0JBQ2xFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDakIsc0JBQU8sT0FBTyxFQUFDOzs7O0NBQ2hCO0FBWEQsc0JBV0M7QUFFRCxTQUFzQixNQUFNLENBQUMsTUFBVzs7Ozs7O29CQUN0QyxnQkFBTSxDQUFDLEtBQUssQ0FBQyx5Q0FBdUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUcsQ0FBQyxDQUFDO29CQUNsRSxxQkFBTSxjQUFPLENBQUksTUFBTSxZQUFTLEVBQUU7NEJBQzVDLE1BQU0sRUFBRSxNQUFNOzRCQUNkLElBQUksRUFBRSxNQUFNOzRCQUNaLElBQUksRUFBRSxJQUFJOzRCQUNWLElBQUksd0JBQU8sSUFBSSxLQUFFLE9BQU8sRUFBRSxnQkFBZ0IsR0FBRTt5QkFDN0MsQ0FBQyxFQUFBOztvQkFMSSxHQUFHLEdBQUcsU0FLVjtvQkFDRixnQkFBTSxDQUFDLEtBQUssQ0FBQyx3Q0FBc0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUcsQ0FBQyxDQUFDO29CQUMxRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBRWIsc0JBQU8sR0FBRyxFQUFDOzs7O0NBQ1o7QUFaRCx3QkFZQztBQUVELFNBQXNCLE1BQU0sQ0FBQyxNQUFXOzs7Ozs7b0JBQ3RDLGdCQUFNLENBQUMsS0FBSyxDQUFDLHlDQUF1QyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBRyxDQUFDLENBQUM7b0JBQ25FLHFCQUFNLGNBQU8sQ0FBSSxNQUFNLFlBQVMsRUFBRTs0QkFDM0MsTUFBTSxFQUFFLE1BQU07NEJBQ2QsSUFBSSxFQUFFLE1BQU07NEJBQ1osSUFBSSxFQUFFLElBQUk7NEJBQ1YsSUFBSSx3QkFBTyxJQUFJLEtBQUUsT0FBTyxFQUFFLG9CQUFvQixHQUFFO3lCQUNqRCxDQUFDLEVBQUE7O29CQUxJLEVBQUUsR0FBRyxTQUtUO29CQUVGLGdCQUFNLENBQUMsS0FBSyxDQUFDLHdDQUFzQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBRyxDQUFDLENBQUM7b0JBQ3pFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDWixzQkFBTyxFQUFFLEVBQUM7Ozs7Q0FDWDtBQVpELHdCQVlDIn0=