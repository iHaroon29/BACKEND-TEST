const TeacherTraining =require("../models/mongodb/teacher.training.model");
const TeacherTrainingDataValidator=require("../utils/teacher.training.validators");
module.exports={
    addNewTeacherForTraining(teacherDetails){
        return TeacherTrainingDataValidator.addNewTeacherForTraining(teacherDetails)
            .then(validTeacherTrainingDetails=>{
                return new TeacherTraining(validTeacherTrainingDetails).save();
            })
    },
    updateTeacherInTrainingUsingId(teacherTrainingId,newDetails){
        return TeacherTrainingDataValidator.updateTeacherForTraining(newDetails)
            .then(validDetails=>{
                return TeacherTraining.findByIdAndUpdate(teacherTrainingId,validDetails)
                    .then(trainingDetails=>{
                        if(!trainingDetails)
                            throw new Error("No data found with specified id");
                        return trainingDetails;
                    })
            })

    },
    deleteTeacherInTrainingUsingId(teacherTrainingId){
        return TeacherTraining.findByIdAndDelete(teacherTrainingId)
            .then(deletedDetails=>{
                if(!deletedDetails)
                    throw new Error("No data found with specified id");
                return deletedDetails;
            })
    },
    getAllTrainingDetails(){
        return TeacherTraining.find();

    },
    getAllTrainingDetailsByTeacherId(teacherId){
        const filter={};
        filter["teachers_id."+teacherId]={$exists:true};
        return TeacherTraining.find(filter)
            .then(trainingDetails=>{
                return trainingDetails;
            })
    },
    getAllTrainingDetailsByTrainerId(trainerId){
        const filter={};
        filter["trainer_id."+trainerId]={$exists:true};
        return TeacherTraining.find(filter)
            .then(trainingDetails=>{
                return trainingDetails;
            })
    }


};