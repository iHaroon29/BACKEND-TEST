const mongoose = require("../../db/mongoDB");

const AssignmentSchema=new mongoose.Schema({
        'course_id':{
            type: mongoose.ObjectId,
            required:true,
        },
        "teacher_id":{
            type: mongoose.ObjectId,
            required:true,
        },
        'instructions':{
            type:String,
            required:true,
        },
        'description':{
            type:String,
            required:true,
        },
        "files":{
            type:Array(String),
            default:[]
        },
        'last_submission_date':{
            type: Date,
            required:true,
        },
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    files: {
      type: Array(String),
      default: [],
    },
    last_submission_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("assignment", AssignmentSchema);
