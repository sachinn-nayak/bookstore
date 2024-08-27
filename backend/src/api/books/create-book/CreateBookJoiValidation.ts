import Joi from "joi";

export const createBookJoiValidationMessages = {
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

const createBookJoiValidation = Joi.object({
  title: Joi.string().required().messages({
    "any.required": createBookJoiValidationMessages.title.required,
    "string.base": createBookJoiValidationMessages.title.base,
    "string.empty": createBookJoiValidationMessages.title.empty,
  }),
  author: Joi.string().required().messages({
    "any.required": createBookJoiValidationMessages.author.required,
    "string.base": createBookJoiValidationMessages.author.base,
    "string.empty": createBookJoiValidationMessages.author.empty,
  }),
  description: Joi.string().required().messages({
    "any.required": createBookJoiValidationMessages.description.required,
    "string.base": createBookJoiValidationMessages.description.base,
    "string.empty": createBookJoiValidationMessages.description.empty,
  }),
  yearOfPublication: Joi.string().required().messages({
    "any.required": createBookJoiValidationMessages.yearOfPublication.required,
    "string.base": createBookJoiValidationMessages.yearOfPublication.base,
    "string.empty": createBookJoiValidationMessages.yearOfPublication.empty,
  }),
});

export default createBookJoiValidation;
