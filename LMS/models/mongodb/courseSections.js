const mongoose=require("../../db/mongoDB");
const CourseSectionsSchema=new mongoose.Schema({
    "courseId":{
        type:Number,
    },
    'name':{
        type:Number,
    },
    'active':{
        type:Boolean,
    },
    'createdAt':{
        type:Date,
        default:Date.now
    },
    'updatedAt':{
        type:Date,
        default:Date.now
    },
    'deletedAt':{
        type:Date,
    },
});

module.exports=mongoose.model("courseSection",CourseSectionsSchema);