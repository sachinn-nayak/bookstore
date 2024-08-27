"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BcryptHashControl_1 = __importDefault(require("./BcryptHashControl"));
class HashControlFactory {
    create() {
        let hashControl = BcryptHashControl_1.default;
        return hashControl;
    }
}
exports.default = HashControlFactory;
//# sourceMappingURL=HashControlFactory.js.map