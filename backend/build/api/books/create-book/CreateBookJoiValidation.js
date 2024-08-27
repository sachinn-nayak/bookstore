"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookJoiValidationMessages = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createBookJoiValidationMessages = {
    title: {
        required: "title field is required",
        base: "title field should be type string",
        empty: "title field should not be empty",
    },
    author: {
        required: "author field is required",
        base: "author field should be type string",
        empty: "author field should not be empty",
    },
    description: {
        required: "description field is required",
        base: "description field should be type string",
        empty: "description field should not be empty",
    },
    yearOfPublication: {
        required: "yearOfPublication field is required",
        base: "yearOfPublication field should be type string",
        empty: "yearOfPublication field should not be empty",
    },
};
const createBookJoiValidation = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        "any.required": exports.createBookJoiValidationMessages.title.required,
        "string.base": exports.createBookJoiValidationMessages.title.base,
        "string.empty": exports.createBookJoiValidationMessages.title.empty,
    }),
    author: joi_1.default.string().required().messages({
        "any.required": exports.createBookJoiValidationMessages.author.required,
        "string.base": exports.createBookJoiValidationMessages.author.base,
        "string.empty": exports.createBookJoiValidationMessages.author.empty,
    }),
    description: joi_1.default.string().required().messages({
        "any.required": exports.createBookJoiValidationMessages.description.required,
        "string.base": exports.createBookJoiValidationMessages.description.base,
        "string.empty": exports.createBookJoiValidationMessages.description.empty,
    }),
    yearOfPublication: joi_1.default.string().required().messages({
        "any.required": exports.createBookJoiValidationMessages.yearOfPublication.required,
        "string.base": exports.createBookJoiValidationMessages.yearOfPublication.base,
        "string.empty": exports.createBookJoiValidationMessages.yearOfPublication.empty,
    }),
});
exports.default = createBookJoiValidation;
//# sourceMappingURL=CreateBookJoiValidation.js.map