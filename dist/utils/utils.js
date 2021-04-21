"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPopClient = exports.checkRs = exports.sleep = void 0;
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
exports.sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
function checkRs(rs) {
    if (rs.Status !== 'Success') {
        throw new Error(rs.Body);
    }
}
exports.checkRs = checkRs;
exports.getPopClient = function (credentials, endpoint, apiVersion) {
    return new pop_core_1.default({
        endpoint: endpoint,
        apiVersion: apiVersion,
        accessKeyId: credentials.AccessKeyID,
        accessKeySecret: credentials.AccessKeySecret,
        opts: {
            timeout: 10 * 1000,
        },
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0VBQXFDO0FBR3hCLFFBQUEsS0FBSyxHQUFHLFVBQUMsRUFBVSxJQUFLLE9BQUEsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUF2QixDQUF1QixDQUFDLEVBQWpELENBQWlELENBQUM7QUFFdkYsU0FBZ0IsT0FBTyxDQUFDLEVBQU87SUFDN0IsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtRQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxQjtBQUNILENBQUM7QUFKRCwwQkFJQztBQUVZLFFBQUEsWUFBWSxHQUFHLFVBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxVQUFVO0lBQzVELE9BQU8sSUFBSSxrQkFBRyxDQUFDO1FBQ2IsUUFBUSxFQUFFLFFBQVE7UUFDbEIsVUFBVSxFQUFFLFVBQVU7UUFDdEIsV0FBVyxFQUFFLFdBQVcsQ0FBQyxXQUFXO1FBQ3BDLGVBQWUsRUFBRSxXQUFXLENBQUMsZUFBZTtRQUM1QyxJQUFJLEVBQUU7WUFDSixPQUFPLEVBQUUsRUFBRSxHQUFHLElBQUk7U0FDbkI7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==