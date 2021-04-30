const mongoose=require("../../db/mongoDB");

const ClassroomStudent=new mongoose.schema("classroomStudent",{
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

module.exports=ClassroomStudent;


