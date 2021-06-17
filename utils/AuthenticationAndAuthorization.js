const Joi = require("joi");

module.exports.MakeLogin = (loginDetails) => {
  const Schema = Joi.object({
    username: Joi.string().email().required(),
    password: Joi.string().required(),
  }).options({ stripUnknown: true });
  return Schema.validateAsync(loginDetails);
};
