const mongoose=require("../db/mongoDB");

const CoursesSchema=new mongoose.Schema({
        'title':{
            type:String,
            default:"title"
        },
        'description':{
            type:String,
            default:"",
        },
        "teachers":{
            type:Object, // Teacher's id as key and details as values
            default:{},
        },
        'image':{
            type:String,
        },
        'price':{
            type:Number,
            default:0,
        },
        'discount':{
            type:Number,
            default:0,
        },
    },
    {
        timestamps:true
    });

module.exports=mongoose.model("course",CoursesSchema);