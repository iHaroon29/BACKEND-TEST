const mongoose=require("../../db/mongoDB");

const CoursesSchema=new mongoose.Schema({
    'classroomId':{
        type:Number,
    },
    'title':{
        type:String,
    },
    'image':{
        type:String,
    },
    'description':{
        type:String,
    },
    'price':{
        type:Number,
    },
    'active':{
        type:Boolean,
    },
    'createdAt':{
        type:Date,
        default:Date.now,
    },
    'updatedAt':{
        type:Date,
    },
});

module.exports=mongoose.model("course",CoursesSchema);