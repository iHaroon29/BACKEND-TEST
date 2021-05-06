const mongoose = require("../../db/mongoDB");

<<<<<<< HEAD
const AssignmentSchema = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.ObjectId,
      required: true,
=======
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
            // required:true,
        },
>>>>>>> 3a6ae8243c4e5f722d9f712be845d2d4f9706617
    },
    teacher_id: {
      type: mongoose.ObjectId,
      required: true,
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
