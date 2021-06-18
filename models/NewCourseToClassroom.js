const mongoose=require("../db/mongoDB");
const Schema=require("../db/mongoDB").Schema;

const ClassroomCourse=new Schema({
    "classroom_id":{

    },
    "courses_id":{

    },


});

module.exports=mongoose.model("courses_in_class",ClassroomCourse);
