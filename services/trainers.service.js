const TrainerValidator=require("../validators/trainer.validators");
const TrainerDao=require("../dao/trainers.dao");
const ActivityLogger=require("../loggers/activity.logger");
const LOG_FOR_TRAINERS=require("../config/LOGGERS_FOR").trainers;
const ServiceErrorMessage=require("../errors/serviceErrorMessage").getRejectResponse;

module.exports={
    async addNewTrainer(trainerDetails,userDetails={}){
        try{
            const validDataTrainer=await TrainerValidator.addNewTrainer(trainerDetails);
            const addedTrainer=await TrainerDao.addNewTrainer(validDataTrainer);
            await ActivityLogger.logActivityCreatedNew(addedTrainer,LOG_FOR_TRAINERS,userDetails).catch();
            return addedTrainer;
        }catch (e) {
            throw ServiceErrorMessage("unable to add trainer", 503, e);
        }
    },

    async updateTrainerDetailsById(trainerId,trainerDetails,userDetails={}){
        try{
            const oldData=await TrainerDao.getTrainerDetailsByTrainerId(trainerId);
            const validDataTrainer=await TrainerValidator.updateTrainer(trainerDetails);
            const addedTrainer=await TrainerDao.updateTrainerDetailsByTrainerId(validDataTrainer);
            await ActivityLogger.logActivityUpdated(oldData,addedTrainer,LOG_FOR_TRAINERS,userDetails).catch();
            return addedTrainer;
        }catch (e) {
            throw ServiceErrorMessage("unable to update trainer", 503, e);
        }
    },

    async getTrainerDetailsById(trainerId){
        try{
            return await TrainerDao.getTrainerDetailsByTrainerId(trainerId);
        }catch (e) {
            throw ServiceErrorMessage("unable to get trainer", 503, e);
        }
    },

    async getAllTrainers(){
        try{
            return await TrainerDao.getAllTrainers();
        }catch (e) {
            throw ServiceErrorMessage("unable to get all trainer", 503, e);
        }
    },

    async deleteTrainerById(trainerId,userDetails={}){
        try{
            const addedTrainer=await TrainerDao.deleteTrainerDetailsByTrainerId(trainerId);
            await ActivityLogger.logActivityUpdated(addedTrainer,LOG_FOR_TRAINERS,userDetails).catch();
            return addedTrainer;
        }catch (e) {
            throw ServiceErrorMessage("unable to delete trainer", 503, e);
        }
    }
};