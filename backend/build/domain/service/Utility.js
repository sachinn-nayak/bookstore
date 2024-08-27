"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
class Utility {
    static trimInputs(obj) {
        for (let prop in obj) {
            let value = obj[prop], type = typeof value;
            if (value != null && (type == "string" || type == "object") && obj.hasOwnProperty(prop)) {
                if (type == "object") {
                    Utility.trimInputs(obj[prop]);
                }
                else {
                    obj[prop] = obj[prop].trim();
                }
            }
        }
        return obj;
    }
    static getDaysFromDate(date, days) {
        return (0, moment_1.default)(date).add(days, 'days').format("YYYY-MM-DD");
    }
    static getMonthsFromDate(date, days) {
        return (0, moment_1.default)(date).add(days, 'months').format("YYYY-MM-DD");
    }
    static getYearsFromDate(date, days) {
        return (0, moment_1.default)(date).add(days, 'years').format("YYYY-MM-DD");
    }
}
exports.default = Utility;
//# sourceMappingURL=Utility.js.map