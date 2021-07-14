const TrainingDAO=require("../dao/training.dao");
const TrainingValidators=require("../validators/training.validators");
const ServiceError=require("../errors/serviceErrorMessage").getRejectResponse;
const ActivityLogger=require("../loggers/activity.logger");

module.exports={
    async addNewTraining(trainingDetails,userDetails){
        try{
            const validData=await TrainingValidators.newTraining(trainingDetails);
            const trainingDetails=await TrainingDAO.createNewTraining(validData);
            await ActivityLogger.logActivityCreatedNew(trainingDetails,"training",userDetails||{})
                .catch();
            return trainingDetails;
        }catch (e) {
            return ServiceError(e.message||"unable to create training",503,err);
        }
    },
    async updateTrainingUsingTrainingID(trainingId,trainingDetails,userDetails){
        try{
            const validData=await TrainingValidators.updateTraining(trainingDetails);
            const oldData=await TrainingDAO.getTrainingDetailsByTrainingId(trainingId);
            const newTrainingData=await TrainingDAO.createNewTraining(validData);
            await ActivityLogger.logActivityUpdated(oldData,newTrainingData,"training",userDetails||{})
                .catch();
            return trainingDetails;
        }catch (e) {
            return ServiceError(e.message||"unable to create training",503,err);
        }
    },
    async deleteTrainingUsingTrainingID(trainingId,userDetails){
        try{
            const oldData=await TrainingDAO.deleteTrainingDetailsByTrainingId(trainingId);
            await ActivityLogger.logActivityDeleted(oldData,"training",userDetails||{})
                .catch();
            return oldData;
        }catch (e) {
            return ServiceError(e.message||"unable to create training",503,err);
        }
    },
    getTrainingUsingTrainingID(trainingId){
        return new Promise((resolve,reject)=>{
            TrainingDAO.getTrainingDetailsByTrainingId(trainingId)
                .then(trainingDetails=>{
                    if(!trainingDetails){
                        reject("no training found",400);
                    }
                    resolve(trainingDetails);
                })
                .catch(err=>{
                    reject(ServiceError("unable to find training",503,err))
                })
        })
    },
    getTrainingUsingTraineeRole(role){
        return new Promise((resolve,reject)=>{
            TrainingDAO.getAllTraineeOfRole(role)
                .then(trainingDetails=>{
                    if(!trainingDetails){
                        reject("no training found",400);
                    }
                    resolve(trainingDetails);
                })
                .catch(err=>{
                    reject(ServiceError("unable to find training",503,err))
                })
        })
    },
    getAllTrainings(){
        return new Promise((resolve,reject)=>{
            TrainingDAO.findAllTraining()
                .then((allTrainings)=>{
                    if(!allTrainings){
                        reject(ServiceError("no trainings available",400));
                    }
                    resolve(allTrainings);
                }).catch(err=>{
                reject(ServiceError("unable to find training",503,err))
            })
        })
    }
};
