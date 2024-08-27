import Joi from "joi";

export const deleteBookJoiValidationMessages = {
  id: {
    required: "id field is required",
    base: "id field should be of type number",
  },
};

const deleteBookJoiValidation = Joi.object({
  id: Joi.number().required().messages({
    "any.required": deleteBookJoiValidationMessages.id.required,
    "number.base": deleteBookJoiValidationMessages.id.base,
  }),
});

export default deleteBookJoiValidation;
