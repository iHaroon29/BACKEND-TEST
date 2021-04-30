const mongoose=require("../../db/mongoDB");


const LectureFeedbackCallbacks=new mongoose.schema("lectureFeedbackCallbacks",{
    'lectureFeedbackId':{
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
},{
    underscored: true
});

module.exports=LectureFeedbackCallbacks;