const mongoose=require("../../db/mongoDB");


const LectureFeedback=new mongoose.schema("lectureFeedback",{
    'url':{
        type: String,
    },
    'active':{
        type: Boolean,
    },
    'createdAt':{
        type:Date,
        default:Date.now,
    },
    'updatedAt':{
        type:Date,
        default:Date.now,
    },
    'deletedAt':{
        type:Date,
    },
});


module.exports=LectureFeedback;
