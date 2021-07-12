const FeedbackService = require("../../services/lecture.feedback.services");
module.exports = {
  async lectureFeedbackByStudent(req, res) {
    try {
      const feedback = await FeedbackService.lectureFeedbackByStudent(req.body);
      return res.status(202).send(feedback);
    } catch (e) {
      return res.status(400).send(e);
    }
  },
};
