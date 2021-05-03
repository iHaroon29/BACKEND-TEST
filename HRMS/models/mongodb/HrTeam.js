const mongoose=require("../../db/mongoDB");
const Schema=mongoose.Schema;
const HrTeamSchema=new Schema({
        members:{
            type:Object, // HR's id as key and details as values
            default:{},
        },
        leader:{
            type:mongoose.ObjectId,
            required:true,
        },
        is_active:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true,
    });

module.exports=mongoose.model("hr_team",HrTeamSchema);