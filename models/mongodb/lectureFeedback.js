const mongoose = require("../../db/mongoDB");

const LectureFeedbackSchema = new mongoose.Schema(
  {
    lecture_id: {
      type: mongoose.ObjectId,
      required: true,
    },
    students_feedback: {
      type: Array(Object),
      default: [],
    },
    teachers_feedback: {
      type: Array(Object),
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("lectureFeedback", LectureFeedbackSchema);
