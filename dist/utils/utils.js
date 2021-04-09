"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPopClient = exports.checkRs = exports.tranfromV1InputsToInputs = exports.sleep = void 0;
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
var lodash_1 = __importDefault(require("lodash"));
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
exports.sleep = sleep;
var tranfromV1InputsToInputs = function (inputs) {
    var output = {};
    lodash_1.default.forEach(inputs, function (value, key) {
        var k = lodash_1.default.lowerFirst(key);
        if (k === 'properties' || !lodash_1.default.isObject(value)) {
            output[k] = value;
        }
        else {
            output[k] = lodash_1.default.mapKeys(value, function (v, k) { return lodash_1.default.lowerFirst(k); });
        }
    });
    return output;
};
exports.tranfromV1InputsToInputs = tranfromV1InputsToInputs;
function checkRs(rs) {
    if (rs.Status !== 'Success') {
        throw new Error(rs.Body);
    }
}
exports.checkRs = checkRs;
var getPopClient = function (credentials, endpoint, apiVersion) {
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
exports.getPopClient = getPopClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsZ0VBQXFDO0FBQ3JDLGtEQUF1QjtBQUVoQixJQUFNLEtBQUssR0FBRyxVQUFDLEVBQVUsSUFBSyxPQUFBLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxFQUFqRCxDQUFpRCxDQUFDO0FBQTFFLFFBQUEsS0FBSyxTQUFxRTtBQUVoRixJQUFNLHdCQUF3QixHQUFHLFVBQUMsTUFBaUI7SUFDeEQsSUFBTSxNQUFNLEdBQVksRUFBRSxDQUFDO0lBRTNCLGdCQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQUssRUFBRSxHQUFHO1FBQzNCLElBQU0sQ0FBQyxHQUFHLGdCQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLFlBQVksSUFBSSxDQUFDLGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDbkI7YUFBTTtZQUNMLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsZ0JBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQWYsQ0FBZSxDQUFDLENBQUM7U0FDekQ7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQWJXLFFBQUEsd0JBQXdCLDRCQWFuQztBQUVGLFNBQWdCLE9BQU8sQ0FBQyxFQUFPO0lBQzdCLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUI7QUFDSCxDQUFDO0FBSkQsMEJBSUM7QUFFTSxJQUFNLFlBQVksR0FBRyxVQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsVUFBVTtJQUM1RCxPQUFPLElBQUksa0JBQUcsQ0FBQztRQUNiLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFVBQVUsRUFBRSxVQUFVO1FBQ3RCLFdBQVcsRUFBRSxXQUFXLENBQUMsV0FBVztRQUNwQyxlQUFlLEVBQUUsV0FBVyxDQUFDLGVBQWU7UUFDNUMsSUFBSSxFQUFFO1lBQ0osT0FBTyxFQUFFLEVBQUUsR0FBRyxJQUFJO1NBQ25CO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBVlcsUUFBQSxZQUFZLGdCQVV2QiJ9