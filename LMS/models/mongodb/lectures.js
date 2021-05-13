const mongoose=require("../../db/mongoDB");

const Lecture=new mongoose.Schema( {
        'classroom_id':{
            type: mongoose.ObjectId,
            required:true,
        },
        "course_id":{
            type:mongoose.ObjectId,
            required:true,
        },
        "course_section": {
            type: mongoose.ObjectId,
            required: true
        },
        'date_and_time':{
            type:Date,
            // required:true,
        },
        'is_attendance_marked':{
            type: Boolean,
            required:true,
        },
        'crm_meeting_link':{
            type: String,
            default:"",
        },
        'status':{
            type: String,
            default:"not started yet"
        },
        'is_active':{
            type: Boolean,
        },
        "reschedule_information":{
            type:Array(Object),
            default:[],
        }
    },
    {
        timestamps:true
    });

module.exports=mongoose.model("lecture",Lecture);

