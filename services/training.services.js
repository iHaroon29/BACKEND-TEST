const TrainingDAO=require("../dao/training.dao");
const TrainingValidators=require("../validators/training.validators");
const ServiceError=require("../errors/serviceErrorMessage").getRejectResponse;
module.exports={
    addNewTraining(trainingDetails){
        return new Promise((resolve,reject)=>{
            TrainingValidators.newTraining(trainingDetails)
                .then(validData=>{
                    TrainingDAO.createNewTraining(validData)
                        .then(savedData=>{
                            resolve(savedData);
                        })
                        .catch(err=>{
                            reject(ServiceError("unable to create training",503,err))

                        })
                }).catch(err=>{
                reject(ServiceError("invalid data",400,err))
            })
        })
    },
    updateTrainingUsingTrainingID(trainingId,trainingDetails){
        return new Promise((resolve,reject)=>{
            TrainingValidators.updateTraining(trainingDetails)
                .then(validData=>{
                    TrainingDAO.updateTrainingDetailsByTrainingId(trainingId,validData)
                        .then(savedData=>{
                            resolve(savedData);
                        })
                        .catch(err=>{
                            reject(ServiceError("unable to update training",503,err))
                        })
                }).catch(err=>{
                reject(ServiceError("invalid data",400,err))
            })
        })
    },
    deleteTrainingUsingTrainingID(trainingId){
        return new Promise((resolve,reject)=>{
            TrainingDAO.deleteTrainingDetailsByTrainingId(trainingId)
                .then(savedData=>{
                    resolve(savedData);
                })
                .catch(err=>{
                    reject(ServiceError("unable to delete training",503,err))
                })
        })
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
    }
};
