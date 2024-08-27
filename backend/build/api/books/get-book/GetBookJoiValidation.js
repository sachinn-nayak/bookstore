"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const getBookJoiValidationMessages = {
    id: {
        required: "id field is required",
        base: "id field should be of type number",
    },
};
const getBookJoiValidation = joi_1.default.object({
    id: joi_1.default.number().required().messages({
        "any.required": getBookJoiValidationMessages.id.required,
        "number.base": getBookJoiValidationMessages.id.base,
    }),
});
exports.default = getBookJoiValidation;
//# sourceMappingURL=GetBookJoiValidation.js.map