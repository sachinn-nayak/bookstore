"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookJoiValidationMessages = void 0;
const joi_1 = __importDefault(require("joi"));
exports.deleteBookJoiValidationMessages = {
    id: {
        required: "id field is required",
        base: "id field should be of type number",
    },
};
const deleteBookJoiValidation = joi_1.default.object({
    id: joi_1.default.number().required().messages({
        "any.required": exports.deleteBookJoiValidationMessages.id.required,
        "number.base": exports.deleteBookJoiValidationMessages.id.base,
    }),
});
exports.default = deleteBookJoiValidation;
//# sourceMappingURL=DeleteBookJoiValidation.js.map