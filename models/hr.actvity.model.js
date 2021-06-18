const mongoose=require("../db/mongoDB");
const Schema=mongoose.Schema;
const HrActivitySchema=new Schema({
        hr_id:{
            type:mongoose.ObjectId,
            required:true
        },
        activity:{
            type:Object,
            default:[],
        }

    },
    {
        timestamps:true
    });
module.exports=mongoose.model("hr_activity",HrActivitySchema);
