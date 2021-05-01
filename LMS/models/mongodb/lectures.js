const mongoose=require("../../db/mongoDB");


const Lecture=new mongoose.Schema( {

    'classroomId':{
        type: String,
    },
    'dateAndTime':{
        type:Date,
    },
    'isAttendanceMarked':{
        type: Boolean,
    },
    'crmMeetingLink':{
        type: String,
    },
    'status':{
        type: String,
    },
    'isActive':{
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


module.exports=mongoose.model("lecture",Lecture);

