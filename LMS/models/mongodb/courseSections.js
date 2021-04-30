const mongoose=require("../../db/mongoDB");
const CourseSections=new mongoose.schema("courseSection",{
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

module.exports=CourseSections;