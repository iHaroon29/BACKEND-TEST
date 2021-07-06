const Training=require("../models/training.model");
const DAOErrors=require("../errors/dao.errors").getDAOErrorMessage;
module.exports={
    createNewTraining(trainingDetails){
        return new Promise((resolve,reject)=>{
            new Training(trainingDetails).save()
                .then(savedDetails=>{
                    resolve(savedDetails);
                }).catch(err=>{
                    reject(DAOErrors("unable to create training",503,err));
            })
        })
    },
    updateTrainingDetailsByTrainingId(trainingId,TrainingDetails){
        return new Promise((resolve,reject)=>{
            Training.findByIdAndUpdate(trainingId,TrainingDetails)
                .then(updatedTrainingDetails=>{
                    resolve(updatedTrainingDetails);
                }).catch(err=>{
                reject(DAOErrors("unable to update training details",503,err));
            })
        })
    },
    deleteTrainingDetailsByTrainingId(trainingId){
        return new Promise((resolve,reject)=>{
            Training.findByIdAndDelete(trainingId)
                .then(deletedTraining=>{
                    resolve(deletedTraining);
                }).catch(err=>{
                reject(DAOErrors("unable to delete training details",503,err));
            })
        })
    },
    getTrainingDetailsByTrainingId(trainingId){
        return new Promise((resolve,reject)=>{
            Training.findById(trainingId)
                .then(trainingDetails=>{
                    resolve(trainingDetails);
                }).catch(err=>{
                reject(DAOErrors("unable to find training details",503,err));
            })
        })
    },
    getAllTraineeOfRole(trainee_role){
        return new Promise((resolve,reject)=>{
            Training.find({trainee_role:trainee_role})
                .then(trainingDetails=>{
                    resolve(trainingDetails);
                }).catch(err=>{
                reject(DAOErrors("unable to find training details",503,err));
            })
        })
    },
};