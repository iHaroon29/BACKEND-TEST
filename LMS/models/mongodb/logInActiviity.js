const mongoose=require("../../db/mongoDB");
const Schema=require("../../db/mongoDB").Schema;
const LoginActivity=new Schema({
        user_role:{
            type:mongoose.ObjectId,
            required:true,
        },
        user_id:{
            type:mongoose.ObjectId,
            required:true,
        },
        activity:{
            type:Object,
            required:true,
        }
    },
    {
        timestamps:true,
    });
module.exports=mongoose.model("login_activity",LoginActivity);