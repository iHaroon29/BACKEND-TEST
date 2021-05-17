const mongoose=require("../../db/mongoDB");
const Schema=require("../../db/mongoDB").Schema;
const LoginActivity=new Schema({
        user_type:{
            type:String,
            required:true,
        },
        user_id:{
            type:mongoose.ObjectId,
            required:true,
        },
        activity:{
            type:Object,
            required:true,
        },
        has_logged_out:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps:true,
    });
module.exports=mongoose.model("login_activity",LoginActivity);