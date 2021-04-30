const mongoose=require("../../db/mongoDB");

const Classroom=new mongoose.schema("classroom",{
    'name':{
        type:String,
    },
    'timeline':{
        type:Object,
    },
    'status':{
        type:String,
    },
    'classroomType':{
        type:String,
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

module.exports=Classroom;