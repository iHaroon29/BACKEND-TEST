const Joi=require("joi");
const TRAINER_VALID_ROLE=require("../config/TRAINER_ROLE_TYPE");
const TRAINEE_VALID_ROLE=require("../config/TRAINEE_ROLE_TYPE");

module.exports={
    addNewTrainer(trainerDetails){
        return Joi.object({
            trainer_id:Joi.string().required(),
            trainer_will_train_for_role:Joi.string().uppercase().trim(true).valid(...TRAINEE_VALID_ROLE).required(),
            trainer_own_role:Joi.string().uppercase().trim(true).valid(...TRAINER_VALID_ROLE).required(),
        }).options({
            stripUnknown:true,
        }).validateAsync(trainerDetails)
    },
    updateTrainer(trainerDetails){
        return Joi.object({
            trainer_id:Joi.string().optional(),
            trainer_will_train_for_role:Joi.string().uppercase().trim(true).valid(...TRAINEE_VALID_ROLE).optional(),
            trainer_own_role:Joi.string().uppercase().trim(true).valid(...TRAINER_VALID_ROLE).optional(),
        }).options({
            stripUnknown:true,
        }).validateAsync(trainerDetails)
    }
};