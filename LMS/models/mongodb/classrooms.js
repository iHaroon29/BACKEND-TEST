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
        'classroomType':{
            type:String,
            default:"demo"
        },
        'enrolledStudents':{
            type: Object, // student id of enrolled student as key and enrollment details as values
            default:{},
        },
        'courses':{
            type:Object, // course id of registered courses as key and course details as values
            default:{},
        },
    },
    {
        timestamps:true,
    });

module.exports=mongoose.model("classroom",ClassroomSchema);