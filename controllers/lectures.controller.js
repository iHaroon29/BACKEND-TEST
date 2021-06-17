const LectureService = require("../services/lectures.service");
module.exports = {
  addNewLecture(req, res) {
    try {
      const LectureDetails = LectureService.addNewLectureInClassroom(
        req.params.classroomId,
        req.body
      );
      return res.status(202).send(LectureDetails);
    } catch (e) {
      console.log(e);
      return res.sendStatus(400);
    }
  },
  updateLecture(req, res) {
    try {
      const LectureDetails = LectureService.updateLectureById(
        req.params.classroomId,
        req.params.lectureId,
        req.body
      );
      return res.status(202).send(LectureDetails);
    } catch (e) {
      console.log(e);
      return res.sendStatus(400);
    }
  },
  deleteLecture(req, res) {
    try {
      const deletedLecture = LectureService.deleteLectureById(
        req.params.classroomId,
        req.params.lectureId
      );
      return res.status(202).send(deletedLecture);
    } catch (e) {
      console.log(e);
      return res.sendStatus(400);
    }
  },
  getAllLecturesOfClassroom(req, res) {
    try {
      const allLectures = LectureService.getAllLecturesOfClassroom(
        req.params.classroomId
      );
      return res.status(202).send(allLectures);
    } catch (e) {
      console.log(e);
      return res.sendStatus(400);
    }
  },
  getLectureDetails(req, res) {
    try {
      const lectureDetails = LectureService.getLectureDetailsById(
        req.params.classroomId
      );
      return res.status(202).send(lectureDetails);
    } catch (e) {
      console.log(e);
      return res.sendStatus(400);
    }
  },
  async getAllLectures(req, res) {
    try {
      const lectures = await LectureService.getAllLectures();
      return res.status(202).send(lectures);
    } catch (e) {
      res.status(400).send(e);
    }
  },
};
