const mongoose=require("../db/mongoDB");
const OtpSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
    }
},{
    timestamps:true
});
module.exports=mongoose.model("otp",OtpSchema);