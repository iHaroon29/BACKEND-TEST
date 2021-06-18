const mongoose=require("../db/mongoDB");
const {Schema}=mongoose;
const HrRoundsSchema=new Schema({
        name:{
            type:String,
            required:true
        },
        details:{
            type:String,
            required:true
        },
        applicant_type:{
            type:String,
            required:true
        }

    },
    {
        timestamps:true
    });

module.exports=mongoose.model("hr_round",HrRoundsSchema);
