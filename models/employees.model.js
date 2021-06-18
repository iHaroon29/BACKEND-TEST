const mongoose=require("../db/mongoDB");
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
            default:"HR_ADVISOR"
        },
        is_active:{
            type:Boolean,
            default:true
        },
        team:{
            type:mongoose.ObjectId,
            required:true
        }

    },
    {
        timestamps:true
    });
module.exports=mongoose.model("new_employee_form",HrSchema);