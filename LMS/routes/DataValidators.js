/*
*
* Network Data Validator module
*
 */

const Joi = require('joi');

/*
*
* function to validate Users registration data
*
 */
module.exports.Users=(user)=>{
    const JoiSchema = Joi.object({
        id:Joi.number().optional(),
        name:Joi.string().required(),
        email:Joi.string().required(),
        email_verified_at:Joi.string().optional(),
        password:Joi.string().required(),
    }).options({ abortEarly: false });
    const isValid=JoiSchema.validate(user);
    return new Promise((resolve, reject) => {
        if(isValid.error)
            reject(isValid.error);
        resolve(true);
    });
};