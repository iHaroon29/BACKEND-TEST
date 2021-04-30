const mongoose=require("../../db/mongoDB");

const AssignmentSubmission=new mongoose.schema("assignmentSubmission",{
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

module.exports=AssignmentSubmission;