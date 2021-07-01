const Joi=require("joi");
module.exports = {
  addNewAdmin(adminDetails) {
    const Schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }).options({ stripUnknown: true });
    return Schema.validateAsync(adminDetails);
  },
  updateAdminDetails(adminDetails) {
    const Schema = Joi.object({
      name: Joi.string().optional(),
      email: Joi.string().optional(),
      password: Joi.string().optional(),
    }).options({ stripUnknown: true });
    return Schema.validateAsync(adminDetails);
  },
  updatePassword(password) {
    const Schema = Joi.object({
      password: Joi.string().required(),
    }).options({ stripUnknown: true });
    return Schema.validateAsync(password);
  },
};
