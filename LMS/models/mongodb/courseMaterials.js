const mongoose=require("../../db/mongoDB");

const CourseMaterials=new mongoose.schema("courseMaterial",{
    'courseId':{
        type:String,
    },
    'name':{
        type:String,
    },
    'content':{
        type:String,
    },
    'topic':{
        type:String,
    },
    'timeRequired':{
        type:Number,
    },
    'file':{
        type:String,
    },
    'isActive':{
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

module.exports.CourseMaterials=CourseMaterials;