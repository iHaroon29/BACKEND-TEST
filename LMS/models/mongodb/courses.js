const mongoose=require("../../db/mongoDB");

const Courses=new mongoose.schema("course",{
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
    "courseMaterial":Array(Object) // Array of course materials for course
});

module.exports=Courses;