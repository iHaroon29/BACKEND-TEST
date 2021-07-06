const Joi=require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const TRAINEE_ROLES=require("../config/TRAINEE_ROLE_TYPE");
module.exports={
    newTraining(trainingDetails){
        return Joi.object({
            trainer_id:Joi.objectId().required(),
            trainee_id:Joi.objectId().required(),
            trainee_role:Joi.string().valid(...TRAINEE_ROLES).required(),
        }).options({stripUnknown:true}).validateAsync(trainingDetails);
    },
    updateTraining(trainingDetails){
        return Joi.object({
            trainer_id:Joi.objectId().optional(),
            trainee_id:Joi.objectId().optional(),
            trainee_role:Joi.string().valid(...TRAINEE_ROLES).required(),
        }).options({stripUnknown:true}).validateAsync(trainingDetails);
    }
};