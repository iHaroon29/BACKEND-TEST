const mongoose=require("../db/mongoDB");
const Schema=mongoose.Schema;
const AdminSchema=new Schema({
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

},{
    timestamps:true
});
module.exports=mongoose.model("admin",AdminSchema);