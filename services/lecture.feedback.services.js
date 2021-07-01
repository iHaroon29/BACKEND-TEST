const LectureFeedback = require("../models/lecture.feedbacks.model");

module.exports = {
  async lectureFeedbackyTeachers(feedback) {
    let lectureFeedback = await LectureFeedback.find({
      lecture_id: feedback.id,
    });
    if (!lectureFeedback) {
      lectureFeedback = new LectureFeedback({
        lecture_id: feedback.id,
      });
    }
    lectureFeedback.teachers_feedback = feedback.teachers_feedback;

    return lectureFeedback.save();
  },

  async lectureFeedbackByStudent(feedback) {
    let lectureFeedback = await LectureFeedback.find({
      lecture_id: feedback.id,
    });
    if (!lectureFeedback) {
      lectureFeedback = new LectureFeedback({
        lecture_id: feedback.id,
      });
    }
    lectureFeedback.students_feedback = feedback.students_feedback;
    return lectureFeedback.save();
  },
};
