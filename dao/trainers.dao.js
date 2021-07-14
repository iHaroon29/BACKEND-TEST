const Trainer=require("../models/trainers.model");
const DAOError=require("../errors/dao.errors").getDAOErrorMessage;
module.exports={
    addNewTrainer(trainerDetails){
        return new Promise((resolve,reject)=>{
            new Trainer(trainerDetails).save()
                .then(savedDetails=>{
                    resolve(savedDetails);
                }).catch(err=>{
                    reject(DAOError("unable to add new trainer"),503,err);
            })
        })
    },
    updateTrainerDetailsByTrainerId(trainerId,trainerDetails){
        return new Promise((resolve,reject)=>{
            Trainer.findByIdAndUpdate(trainerId,trainerDetails,{new:true})
                .then(updatedDetails=>{
                    if(!updatedDetails){
                        reject(DAOError("no trainer found",400));
                    }
                    resolve(updatedDetails);
                }).catch(err=>{
                reject(DAOError("unable to update trainer"),503,err);
            })
        })

    },
    deleteTrainerDetailsByTrainerId(trainerId){
        return new Promise((resolve,reject)=>{
            Trainer.findByIdAndDelete(trainerId)
                .then(updatedDetails=>{
                    if(!updatedDetails){
                        reject(DAOError("no trainer found",400));
                    }
                    resolve(updatedDetails);
                }).catch(err=>{
                reject(DAOError("unable to delete trainer"),503,err);
            })
        })
    },
    getAllTrainers(){
        return new Promise((resolve,reject)=>{
            Trainer.find()
                .then(updatedDetails=>{
                    resolve(updatedDetails);
                }).catch(err=>{
                reject(DAOError("unable to get all trainers"),503,err);
            })
        })
    },
    getTrainerDetailsByTrainerId(trainerId){
        return new Promise((resolve,reject)=>{
            Trainer.findById(trainerId)
                .then(updatedDetails=>{
                    if(!updatedDetails){
                        reject(DAOError("no trainer found",400));
                    }
                    resolve(updatedDetails);
                }).catch(err=>{
                reject(DAOError("unable to find trainer"),503,err);
            })
        })
    },
    getTrainersByTrainerOwnRole(trainerId,trainer_will_train_for_role){
        return new Promise((resolve,reject)=>{
            Trainer.find({trainer_will_train_for_role:trainer_will_train_for_role})
                .then(updatedDetails=>{
                    if(!updatedDetails){
                        reject(DAOError("no trainer found",400));
                    }
                    resolve(updatedDetails);
                }).catch(err=>{
                reject(DAOError("unable to find trainer"),503,err);
            })
        })
    },
};