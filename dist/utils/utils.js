"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPopClient = exports.checkRs = exports.tranfromV1InputsToInputs = exports.sleep = void 0;
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
var lodash_1 = __importDefault(require("lodash"));
exports.sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
exports.tranfromV1InputsToInputs = function (inputs) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsZ0VBQXFDO0FBQ3JDLGtEQUF1QjtBQUVWLFFBQUEsS0FBSyxHQUFHLFVBQUMsRUFBVSxJQUFLLE9BQUEsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUF2QixDQUF1QixDQUFDLEVBQWpELENBQWlELENBQUM7QUFFMUUsUUFBQSx3QkFBd0IsR0FBRyxVQUFDLE1BQWlCO0lBQ3hELElBQU0sTUFBTSxHQUFZLEVBQUUsQ0FBQztJQUUzQixnQkFBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFLLEVBQUUsR0FBRztRQUMzQixJQUFNLENBQUMsR0FBRyxnQkFBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxZQUFZLElBQUksQ0FBQyxnQkFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ25CO2FBQU07WUFDTCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsZ0JBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLGdCQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFmLENBQWUsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUFFRixTQUFnQixPQUFPLENBQUMsRUFBTztJQUM3QixJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1FBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzFCO0FBQ0gsQ0FBQztBQUpELDBCQUlDO0FBRVksUUFBQSxZQUFZLEdBQUcsVUFBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLFVBQVU7SUFDNUQsT0FBTyxJQUFJLGtCQUFHLENBQUM7UUFDYixRQUFRLEVBQUUsUUFBUTtRQUNsQixVQUFVLEVBQUUsVUFBVTtRQUN0QixXQUFXLEVBQUUsV0FBVyxDQUFDLFdBQVc7UUFDcEMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxlQUFlO1FBQzVDLElBQUksRUFBRTtZQUNKLE9BQU8sRUFBRSxFQUFFLEdBQUcsSUFBSTtTQUNuQjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9