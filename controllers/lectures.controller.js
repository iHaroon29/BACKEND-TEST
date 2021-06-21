const LectureService = require("../services/lectures.service");
module.exports = {
  async addNewLecture(req, res) {
    try {
      const LectureDetails =await LectureService.addNewLectureInClassroom(
        req.params.classroomId,
        req.body
      );
      console.log("lectureDetails="+lectureDetails);
      return res.status(202).send(LectureDetails);
    } catch (e) {
      console.log(e);
      return res.sendStatus(400);
    }
  },
  async updateLecture(req, res) {
    try {
      const LectureDetails =await LectureService.updateLectureById(
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
  async deleteLecture(req, res) {
    try {
      const deletedLecture = await LectureService.deleteLectureById(
        req.params.classroomId,
        req.params.lectureId
      );
      return res.status(202).send(deletedLecture);
    } catch (e) {
      console.log(e);
      return res.sendStatus(400);
    }
  },
  async getAllLecturesOfClassroom(req, res) {
    try {
      const allLectures = await LectureService.getAllLecturesOfClassroom(
        req.params.classroomId
      );
      return res.status(202).send(allLectures);
    } catch (e) {
      console.log(e);
      return res.sendStatus(400);
    }
  },
  async getLectureDetails(req, res) {
    try {
      const lectureDetails =await  LectureService.getLectureDetailsById(
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
