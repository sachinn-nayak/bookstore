import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

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

const authenticationJoiValidation = Joi.object({
  email: Joi.string().required().messages({
    "any.required": authenticateJoiValidationMessages.email.required,
    "string.base": authenticateJoiValidationMessages.email.base,
    "string.empty": authenticateJoiValidationMessages.email.empty,
  }),

  password: passwordComplexity(complexityOptions).required().messages({
    "any.required": authenticateJoiValidationMessages.password.required,
    "string.base": authenticateJoiValidationMessages.password.base,
    "string.empty": authenticateJoiValidationMessages.password.empty,
  }),
});

export default authenticationJoiValidation;
