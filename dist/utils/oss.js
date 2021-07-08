"use strict";
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
var ali_oss_1 = __importDefault(require("ali-oss"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var logger_1 = __importDefault(require("../common/logger"));
var Oss = /** @class */ (function () {
    function Oss() {
    }
    Oss.saveFile = function (bucket, token) {
        return __awaiter(this, void 0, void 0, function () {
            var savePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        savePath = path_1.default.join(process.cwd(), '.s', bucket + "-token");
                        logger_1.default.debug("Save file path is: " + savePath + ", token is: " + token + ".");
                        return [4 /*yield*/, fs_extra_1.default.outputFile(savePath, token)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, savePath];
                }
            });
        });
    };
    Oss.put = function (region, bucket, credential, filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var ossClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ossClient = new ali_oss_1.default({
                            region: "oss-" + region,
                            bucket: bucket,
                            accessKeyId: credential.AccessKeyID,
                            accessKeySecret: credential.AccessKeySecret,
                            stsToken: credential.SecurityToken,
                            timeout: credential.timeout || 7200000,
                        });
                        return [4 /*yield*/, ossClient.put('token', filePath)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, ossClient.putACL('token', 'public-read')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Oss;
}());
exports.default = Oss;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL29zcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUEwQjtBQUMxQixzREFBMEI7QUFDMUIsOENBQXdCO0FBQ3hCLDREQUFzQztBQUV0QztJQUFBO0lBdUJBLENBQUM7SUF0QmMsWUFBUSxHQUFyQixVQUFzQixNQUFNLEVBQUUsS0FBSzs7Ozs7O3dCQUMzQixRQUFRLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFLLE1BQU0sV0FBUSxDQUFDLENBQUM7d0JBRW5FLGdCQUFNLENBQUMsS0FBSyxDQUFDLHdCQUFzQixRQUFRLG9CQUFlLEtBQUssTUFBRyxDQUFDLENBQUM7d0JBQ3BFLHFCQUFNLGtCQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBQTs7d0JBQXBDLFNBQW9DLENBQUM7d0JBQ3JDLHNCQUFPLFFBQVEsRUFBQzs7OztLQUNqQjtJQUVZLE9BQUcsR0FBaEIsVUFBaUIsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUTs7Ozs7O3dCQUM3QyxTQUFTLEdBQUcsSUFBSSxpQkFBRyxDQUFDOzRCQUN4QixNQUFNLEVBQUUsU0FBTyxNQUFROzRCQUN2QixNQUFNLFFBQUE7NEJBQ04sV0FBVyxFQUFFLFVBQVUsQ0FBQyxXQUFXOzRCQUNuQyxlQUFlLEVBQUUsVUFBVSxDQUFDLGVBQWU7NEJBQzNDLFFBQVEsRUFBRSxVQUFVLENBQUMsYUFBYTs0QkFDbEMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxPQUFPLElBQUksT0FBTzt5QkFDdkMsQ0FBQyxDQUFDO3dCQUVILHFCQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFBOzt3QkFBdEMsU0FBc0MsQ0FBQzt3QkFFdkMscUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLEVBQUE7O3dCQUE5QyxTQUE4QyxDQUFDOzs7OztLQUNoRDtJQUNILFVBQUM7QUFBRCxDQUFDLEFBdkJELElBdUJDIn0=