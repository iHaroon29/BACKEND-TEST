const mongoose=require("../db/mongoDB");
const Schema=mongoose.Schema;
const NewHrApplicantsRoundSchema=new Schema({
        name:{
            type:String,
            required:true,
            lowercase:true,
            unique:true
        },
        activities:{
            type:Array(Object),
            default:[]
        }
    },
    {
        timestamps:true,
    });

module.exports=mongoose.model("new_hr_applicants_round",NewHrApplicantsRoundSchema);