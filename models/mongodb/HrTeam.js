const mongoose=require("../../db/mongoDB");
const Schema=mongoose.Schema;
const HrTeamSchema=new Schema({
        name:{
            type:String,
            default:"New Team"

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