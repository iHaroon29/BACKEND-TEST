const mongoose=require("../../db/mongoDB");

const ClassroomSchema= new mongoose.Schema({
        'name':{
            type:String,
            default:"new"
        },
        'timeline':{
            type:Object,
            default:{},
        },
        'status':{
            type:String,
        },
        'classroom_type':{
            type:String,
            default:"demo"
        },
        'enrolled_students':{
            type: Object, // student id of enrolled student as key and enrollment details as values
            default:{},
            required: true
        },
        'courses':{
            type:Object, // course id of registered courses as key and course details as values
            default:{},
            required: true
        },
    },
    {
        timestamps:true,
    });

module.exports=mongoose.model("classroom",ClassroomSchema);