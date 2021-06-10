const mongoose=require("../../db/mongoDB");
const TeacherTrainingSchema=new mongoose.Schema({
    classroomDetails:{
        type:Object,
        required:true,
    },
    trainers_id:{
        type:Object,
        required:true,
    },
    teachers_id:{
        type:Object,
        required:true,
    },
    course_id:{
        type:Object,
        required:true,
    },
    meeting_id:{
        type:Object,
        required:true,
    }

});
module.exports=mongoose.model("teacher_training",TeacherTrainingSchema);
