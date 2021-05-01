const mongoose=require("../../db/mongoDB");


const LectureFeedbackSchema=new mongoose.Schema({
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


module.exports=mongoose.model("lectureFeedback",LectureFeedbackSchema);
