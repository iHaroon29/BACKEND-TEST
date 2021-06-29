const FeedbackService = require("../services/lecture.feedback.services");
module.exports = {
  async lectureFeedbackyTeachers(req, res) {
    try {
      const feedback = await FeedbackService.lectureFeedbackyTeachers(req.body);
      return res.status(202).send(feedback);
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async lectureFeedbackByStudent(req, res) {
    try {
      const feedback = await FeedbackService.lectureFeedbackByStudent(req.body);
      return res.status(202).send(feedback);
    } catch (e) {
      return res.status(400).send(e);
    }
  },
};
