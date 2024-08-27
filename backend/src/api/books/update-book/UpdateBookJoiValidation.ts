import Joi from "joi";

const updateBookJoiValidationMessages = {
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

const updateBookJoiValidation = Joi.object({
    title: Joi.string().required().messages({
        "any.required": updateBookJoiValidationMessages.title.required,
        "string.base": updateBookJoiValidationMessages.title.base,
        "string.empty": updateBookJoiValidationMessages.title.empty,
    }),
    author: Joi.string().required().messages({
        "any.required": updateBookJoiValidationMessages.author.required,
        "string.base": updateBookJoiValidationMessages.author.base,
        "string.empty": updateBookJoiValidationMessages.author.empty,
    }),
    description: Joi.string().required().messages({
        "any.required": updateBookJoiValidationMessages.description.required,
        "string.base": updateBookJoiValidationMessages.description.base,
        "string.empty": updateBookJoiValidationMessages.description.empty,
    }),
    yearOfPublication: Joi.string().required().messages({
        "any.required": updateBookJoiValidationMessages.yearOfPublication.required,
        "string.base": updateBookJoiValidationMessages.yearOfPublication.base,
        "string.empty": updateBookJoiValidationMessages.yearOfPublication.empty,
    }),
});

export default updateBookJoiValidation;
