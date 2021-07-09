const mongoose=require("../db/mongoDB");

const ClassroomSchema= new mongoose.Schema({
        'name':{
            type:String,
            default:"new",
            required:true
        },
        'timeline':{
            type:Object,
            default:{},
            required:true
        },
        'status':{
            type:String,
            default:"active",
            required:true,
            lowercase:true
        },
        'classroom_type':{
            type:String,
            default:"demo",
            required:true,
            lowercase:true
        },
        'enrolled_students':{
            type: Object, // student id of enrolled student as key and enrollment details as values
            default:{},
            required:true
        },
        'enrolled_courses':{
            type:Object, // course id of registered courses as key and course details as values
            default:{},
            required:true
        },
        'teachers':{
            type:Object, // course id of registered courses as key and course details as values
            default:{},
            required:true
        },
        'demo_class':{
            type:Object,
            default:{},
            required:true
        },
    },
    {
        timestamps:true,
    });

module.exports=mongoose.model("classroom",ClassroomSchema);