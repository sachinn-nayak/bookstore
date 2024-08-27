"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const standard_http_error_1 = __importDefault(require("standard-http-error"));
class JwtAuthControl {
    sign(valueToEncode, secret, options = null) {
        try {
            let token = jsonwebtoken_1.default.sign({ payload: valueToEncode }, secret, options);
            return token;
        }
        catch (error) {
            throw new standard_http_error_1.default(500, "InternalServerError");
        }
    }
    decode(verifyToken, secret) {
        try {
            const decoded = jsonwebtoken_1.default.verify(verifyToken, secret);
            return decoded.payload;
        }
        catch (error) {
            throw new standard_http_error_1.default(401, "Unauthorized");
        }
    }
    decodeRequestHeader(req, secret) {
        try {
            let token = req.headers.jwt;
            return this.decode(token, secret);
        }
        catch (error) {
            throw new standard_http_error_1.default(401, "Unauthorized");
        }
    }
}
exports.default = JwtAuthControl;
//# sourceMappingURL=JwtAuthControl.js.map