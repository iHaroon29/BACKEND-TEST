const mongoose=require("../../db/mongoDB");

const CoursesSchema=new mongoose.Schema({
    'classroomId':{
        type:mongoose.ObjectId,
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
    'discount':{
        type:Number,
        default:0,
    },
    teachers:{
        type:Object, // Teacher's id as key and details as values
        default:{},
    },
    'isActive':{
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