const mongoose=require("../db/mongoDB");


const LectureFeedbackCallbacksSchema=new mongoose.Schema({
    'lecture_feedback_id':{
        type: String,
    },
    'date':{
        type: Date,
        default:Date.now,
    },
    'isNotified':{
        type:Boolean,
        default:false,
    },
    'isActive':{
        type: Boolean,
        default:1,
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

module.exports=mongoose.model("lectureFeedback",LectureFeedbackCallbacksSchema);