const mongoose=require("../../db/mongoDB");

const CourseMaterialsSchema=new mongoose.Schema({
        'course_section_id':{
            type:mongoose.ObjectId,
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
            type:String,
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