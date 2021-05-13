const mongoose=require("../../db/mongoDB");
const Schema=mongoose.Schema;
const TeacherSchema=new Schema({
    "name":{
        type:String,
        default:"new teacher",
        required:true
    },
    "profile_picture":{
        type:String,
        default:null,
    },
    "primary_phone_number":{
        type:String,
        required:true
    },
    "alternate_phone_number":{
        type:Array(String),
        default:[],
    },
    "email":{
        type:String,
        required:true
    },
    "password":{
        type:String,
        required:true
    },
    "last_seen":{
        type:Date,
        default:Date.now,
        required:true
    },
    "country":{
        type:String,
        required:true

    },
    "zip_code":{
        type:String,
        required:true

    },
    "address":{
        type:String,
        required:true
    },
    // Variable to mark if the teacher is available to assign a new class, is enabled by teacher and disabled by teacher and HR
    is_available:{
        type:Boolean,
        default:true,
    }
},{
    timestamps:true
});
module.exports=mongoose.model("teacher",TeacherSchema);