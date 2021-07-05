const Joi=require("joi");
module.exports={
    addNewTrainer(trainerDetails){
        return Joi.object({
            trainer_id:Joi.string().required(),
            trainer_will_train_for_role:Joi.string().uppercase().trim(true).valid(...["ADMIN","TEACHER"]).required(),
            trainer_own_role:Joi.string().uppercase().trim(true).valid(...["ADMIN","TEACHER"]).required(),
        }).options({
            stripUnknown:true,
        }).validateAsync(trainerDetails)
    },
    updateTrainer(trainerDetails){
        return Joi.object({
            trainer_id:Joi.string().optional(),
            trainer_will_train_for_role:Joi.string().uppercase().trim(true).valid(...["ADMIN","TEACHER"]).optional(),
            trainer_own_role:Joi.string().uppercase().trim(true).valid(...["ADMIN","TEACHER"]).optional(),
        }).options({
            stripUnknown:true,
        }).validateAsync(trainerDetails)
    }
};