"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPopClient = exports.sleep = void 0;
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
exports.sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
exports.getPopClient = function (credentials, endpoint, apiVersion) {
    return new pop_core_1.default({
        endpoint: endpoint,
        apiVersion: apiVersion,
        accessKeyId: credentials.AccessKeyID,
        accessKeySecret: credentials.AccessKeySecret,
        // @ts-ignore: Set SecurityToken
        securityToken: credentials.SecurityToken,
        opts: {
            timeout: 10 * 1000,
        },
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0VBQXFDO0FBRXhCLFFBQUEsS0FBSyxHQUFHLFVBQUMsRUFBVSxJQUFLLE9BQUEsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUF2QixDQUF1QixDQUFDLEVBQWpELENBQWlELENBQUM7QUFFMUUsUUFBQSxZQUFZLEdBQUcsVUFBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLFVBQVU7SUFDNUQsT0FBTyxJQUFJLGtCQUFHLENBQUM7UUFDYixRQUFRLFVBQUE7UUFDUixVQUFVLFlBQUE7UUFDVixXQUFXLEVBQUUsV0FBVyxDQUFDLFdBQVc7UUFDcEMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxlQUFlO1FBQzVDLGdDQUFnQztRQUNoQyxhQUFhLEVBQUUsV0FBVyxDQUFDLGFBQWE7UUFDeEMsSUFBSSxFQUFFO1lBQ0osT0FBTyxFQUFFLEVBQUUsR0FBRyxJQUFJO1NBQ25CO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=