const Trainer=require("../models/trainers.model");
const TrainerValidator=require("../validators/trainer.validators");
module.exports={
    addNewTrainer(trainerDetails){
        return new Promise((resolve,reject)=>{
            TrainerValidator.addNewTrainer(trainerDetails)
                .then(validTrainerDetails=>{
                    new Trainer(validTrainerDetails).save()
                        .then(savedTrainerDetails=>{
                            resolve(savedTrainerDetails);
                        }).catch(err=>{
                        reject({
                            message:"invalid data "+err,
                            statusCode:503,
                            trace:err
                        })
                    })
                }).catch(err=>{
                reject({
                    message:"invalid data "+err,
                    statusCode:400,
                    trace:err
                })
            })
        })
    },
    updateTrainerDetailsById(trainerId,trainerDetails){
        return new Promise((resolve,reject)=> {
            TrainerValidator.updateTrainer(trainerDetails)
                .then(validUpdateDetails=>{
                    Trainer.findByIdAndUpdate(trainerId,validUpdateDetails,{new:true})
                        .then(updatedCourse=>{
                            if(!updatedCourse){
                                reject({
                                    message:"no trainer found",
                                    statusCode:400,
                                    trace:"no trace found"
                                })
                            }
                            resolve(updatedCourse);
                        }).catch(err=>{
                        reject({
                            message:"unable to update trainer",
                            statusCode:503,
                            trace:err
                        })
                    })
                }).catch((err)=>{
                reject({
                    message:"invalid update details",
                    statusCode:400,
                    trace:err
                })
            })
        })
    },
    getTrainerDetailsById(trainerId){
        return new Promise((resolve,reject)=>{
            Trainer.findById(trainerId)
                .then(trainerDetails=>{
                    if(!trainerDetails){
                        reject({
                            message:"no trainer found",
                            statusCode:400,
                            trace:"no trace found"
                        })
                    }
                    resolve(trainerDetails);
                }).catch(err=>{
                reject({
                    message:"unable to find trainer",
                    statusCode:503,
                    trace:err
                })
            })
        })
    },
    getAllTrainers(){
        return new Promise((resolve,reject)=>{
            Trainer.find().then((allTrainers)=>{
                resolve(allTrainers)
            }).catch(err=>{
                reject({
                    message:"unable to find all trainers",
                    statusCode:503,
                    trace:err
                })
            })
        })
    },
    deleteTrainerById(trainerId){
        return new Promise((resolve,reject)=>{
            Trainer.findByIdAndDelete(trainerId)
                .then(deletedData=>{
                    if(!deletedData){
                        reject({
                            message:"no trainer found",
                            statusCode:400,
                            trace:"no trace found"
                        })
                    }
                    resolve(deletedData);
                }).catch(err=>{
                reject({
                    message:"unable to delete trainer",
                    statusCode:503,
                    trace:err
                })
            })
        })
    }
};