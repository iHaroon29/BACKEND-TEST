const mongoose=require("../../db/mongoDB");

const ClassroomSchema= new mongoose.Schema({
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

module.exports=mongoose.model("classroom",ClassroomSchema);