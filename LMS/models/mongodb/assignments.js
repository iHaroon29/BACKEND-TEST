const mongoose=require("../../db/mongoDB");

const Assignment=new mongoose.schema("assignment",{
    'title':{
        type: String
    },
    'course_id':{
        type: Number
    },
    'instructions':{
        type:String
    },
    'questionFile':{
        type:String
    },
    'lastSubmissionDate':{
        type: Date
    },
    'createdAt':{
        type: Date,
        default:Date.now
    },
    'updatedAt':{
        type: Date
    }

});
module.exports=Assignment;