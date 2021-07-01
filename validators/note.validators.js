const Joi = require("joi");
module.exports = {
  newNote(noteDetails) {
    const JoiSchema = Joi.object({
      title: Joi.string().required(),
      teacher_id: Joi.objectId().required(),
      description: Joi.string().required(),
    }).options({ stripUnknown: true });
    return JoiSchema.validateAsync(noteDetails);
  },
};
