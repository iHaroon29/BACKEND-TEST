const mongoose=require("../db/mongoDB");
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
        'is_active':{
            type:Boolean,
            default:true
        },
        'image':{
            type:String,
        },
        'price':{
            type:Number,
        },
        'discount':{
            type:Number,
            default:0,
        },
    },
    {
        timestamps:true,
    });

module.exports=mongoose.model("course_section",CourseSectionsSchema);