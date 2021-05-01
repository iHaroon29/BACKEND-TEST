const mongoose=require("../../db/mongoDB");
const CourseSectionsSchema=new mongoose.Schema({
        "course_id":{
            type:mongoose.ObjectId,
        },
        'name':{
            type:String,
            default:"new section"
        },
        "description":{
            type:String,
            default:"",
            required:false,
        },
        "materials":{
            type:Array(object),
            default:[],
        },
        'is_active':{
            type:Boolean,
            default:true
        },
    },
    {
        timestamps:true,
    });

module.exports=mongoose.model("courseSection",CourseSectionsSchema);