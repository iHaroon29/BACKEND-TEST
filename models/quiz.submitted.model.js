const mongoose=require("../db/mongoDB");
const SubmittedQuizSchema=mongoose.Schema({
    quiz_response:{
        type:Array(Object),
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    user_role:{
        type:String,
        required:true
    },
    quiz_questions_and_answers:{
        type:Array(Object),
        required:true,
    },
    course_id:{
        type:String,
        required:true
    }
},{
    timestamps:true,
});
module.exports=mongoose.model("quiz_submission",SubmittedQuizSchema);