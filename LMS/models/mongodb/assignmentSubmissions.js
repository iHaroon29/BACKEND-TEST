const mongoose=require("../../db/mongoDB");

const AssignmentSubmissionSchema=new mongoose.Schema({
    'assignmentId':{
        type:String,
    },
    'studentId':{
        type:String,
    },
    'answerFile':{
        type:String,
    },
    'comments':{
        type:Object,
    },
    'status':{
        type:Object,
    },
    'createdAt':{
        type:Date,
        default:Date.now
    },
    'updatedAt':{
        type:Date,
    },
});

module.exports=mongoose.model("assignmentSubmission",AssignmentSubmissionSchema);