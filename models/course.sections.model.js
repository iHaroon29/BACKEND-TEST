const mongoose=require("../db/mongoDB");
const CourseSectionsSchema=new mongoose.Schema({
        "course_id":{
            type:mongoose.ObjectId,
            required:true
        },
        'name':{
            type:String,
            default:"new course section",
        },
        "description":{
            type:String,
            default:"",
        },
        quiz:{
            type:Array(Object),
            default:[],
        },
    },
    {
        timestamps:true,
    });

module.exports=mongoose.model("course_section",CourseSectionsSchema);