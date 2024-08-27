import Joi from "joi";

const getBookJoiValidationMessages = {
  id: {
    required: "id field is required",
    base: "id field should be of type number",
  },
};

const getBookJoiValidation = Joi.object({
  id: Joi.number().required().messages({
    "any.required": getBookJoiValidationMessages.id.required,
    "number.base": getBookJoiValidationMessages.id.base,
  }),
});

export default getBookJoiValidation;
