const mongoose=require("../../db/mongoDB");
const Schema= mongoose.Schema;


const CourseActivitySchema=new Schema({
    course_id:{
        type:mongoose.ObjectId,
        required:true,

    },
    activity:{
        type:Array(Object),
        default:[],
    }
});
module.exports=mongoose.model("courseActivity",CourseActivitySchema);