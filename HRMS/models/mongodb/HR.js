const mongoose=require("../../db/mongoDB");
const Schema=mongoose.Schema;
const HrSchema=new Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            default:"HR"
        },
        is_active:{
            type:Boolean,
            default:true
        },

    },
    {
        timestamps:true
    });
module.exports=mongoose.model("hr",HrSchema);