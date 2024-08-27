"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
const complexityOptions = {
    min: 8,
    max: 25,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
};
const authenticateJoiValidationMessages = {
    email: {
        required: "email field is required",
        base: "email field should be type string",
        empty: "email field should not be empty",
    },
    password: {
        required: "password field is required",
        base: "password field should be type string",
        empty: "password field should not be empty",
    },
};
const authenticationJoiValidation = joi_1.default.object({
    email: joi_1.default.string().required().messages({
        "any.required": authenticateJoiValidationMessages.email.required,
        "string.base": authenticateJoiValidationMessages.email.base,
        "string.empty": authenticateJoiValidationMessages.email.empty,
    }),
    password: (0, joi_password_complexity_1.default)(complexityOptions).required().messages({
        "any.required": authenticateJoiValidationMessages.password.required,
        "string.base": authenticateJoiValidationMessages.password.base,
        "string.empty": authenticateJoiValidationMessages.password.empty,
    }),
});
exports.default = authenticationJoiValidation;
//# sourceMappingURL=AuthenticationJoiValidation.js.map