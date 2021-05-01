const mongoose=require("../../db/mongoDB");

const ClassroomStudentSchema=new mongoose.Schema({
    "classroomId":{
        type:String,
    },
    "studentId":{
        type:String,
    },
    "isActive":{
        type:Boolean,
        default:true,
    },
    "createdAt":{
        type:Date,
        default:Date.now
    },
    "updatedAt":{
        type:Date,
        default:Date.now
    },
    "deletedAt":{
        type:Date,
    },
});

module.exports=mongoose.model("classroomStudent",ClassroomStudentSchema);


