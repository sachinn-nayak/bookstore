"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JwtAuthControl_1 = __importDefault(require("./JwtAuthControl"));
class AuthControlFactory {
    create() {
        let authControl = new JwtAuthControl_1.default();
        return authControl;
    }
}
exports.default = AuthControlFactory;
//# sourceMappingURL=AuthControlFactory.js.map