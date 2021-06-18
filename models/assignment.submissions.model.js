const mongoose=require("../db/mongoDB");

const AssignmentSubmissionSchema=new mongoose.Schema({
        'assignment_id':{
            type:mongoose.ObjectId,
            required:true
        },
        'student_id':{
            type:mongoose.ObjectId,
            required:true,
        },
        'answer_files':{
            type:Array(String),
            default:[]
        },
        "answer_text":{
            type:String,
            default:"",
        },
        'comments':{
            type:Array(Object),
            default:[],
        },
        'status':{
            type:Object,
            default:"unchecked"
        },
        "grade":{
            type:String,
            default:"B+",
        }
    },
    {
        timestamps:true,
    }
);

module.exports=mongoose.model("assignmentSubmission",AssignmentSubmissionSchema);