const mongoose=require("../db/mongoDB");

const CoursesSchema=new mongoose.Schema({
        'classroom_id':{
            type:mongoose.ObjectId,
        },
        'title':{
            type:String,
        },
        'description':{
            type:String,
        },
        'price':{
            type:Number,
        },
        'discount':{
            type:Number,
            default:0,
        },
        teachers:{
            type:Object, // Teacher's id as key and details as values
            default:{},
        },
        'is_active':{
            type:Boolean,
        },
        quiz:{
            type:Array(Object),
            default:[{}],
        }
    },
    {
        timestamps:true
    });

module.exports=mongoose.model("course",CoursesSchema);