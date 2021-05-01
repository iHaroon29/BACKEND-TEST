const mongoose=require("../../db/mongoDB");

const CourseMaterialsSchema=new mongoose.Schema({
        'course_id':{
            type:String,
        },
        'name':{
            type:String,
            default:"new course material"
        },
        'content':{
            type:String,
            default:""
        },
        'topic':{
            type:String,
            required:true
        },
        'time_required':{
            type:Number,
            required:true
        },
        'file':{
            type:Array(String),
        },
        'is_active':{
            type:Boolean,
            default:true,
        },
    },
    {
        timestamps:true
    });

module.exports=mongoose.model("courseMaterial",CourseMaterialsSchema);