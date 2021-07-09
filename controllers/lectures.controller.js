const LectureService = require("../services/lectures.service");
module.exports = {
  async addNewLecture(req, res) {
    try {
      const LectureDetails =await LectureService.addNewLectureInClassroom(req.body);
      return res.status(202).send(LectureDetails);
    } catch (e) {
      return res.status(e.statusCode||503).send(e);
    }
  },
  async updateLecture(req, res) {
    try {
      const LectureDetails =await LectureService.updateLectureById(req.params.lectureId,req.body);
      return res.status(202).send(LectureDetails);
    } catch (e) {
      return res.status(e.statusCode||503).send(e);
    }
  },
  async deleteLecture(req, res) {
    try {
      const deletedLecture = await LectureService.deleteLectureById(req.params.lectureId);
      return res.status(202).send(deletedLecture);
    } catch (e) {
      console.log(e);
      return res.status(e.statusCode||503).send(e);
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
      return res.status(e.statusCode||503).send(e);
    }
  },
  async getLectureDetails(req, res) {
    try {
      const lectureDetails =await  LectureService.getLectureDetailsById(req.params.lectureId);
      return res.status(202).send(lectureDetails);
    } catch (e) {
      return res.status(e.statusCode||503).send(e);
    }
  },
  async getAllLectures(req, res) {
    try {
      const lectures = await LectureService.getAllLectures();
      return res.status(202).send(lectures);
    } catch (e) {
      return res.status(e.statusCode||503).send(e);
    }
  },
  async attendanceDone(req, res) {
    try {
      const lectures = await LectureService.setAsAttendanceTaken(req.params.lectureId);
      return res.status(202).send(lectures);
    } catch (e) {
      return res.status(e.statusCode||503).send(e);
    }
  },
  async lectureOngoing(req, res) {
    try {
      const lectures = await LectureService.setLectureAsOngoing(req.params.lectureId);
      return res.status(202).send(lectures);
    } catch (e) {
      return res.status(e.statusCode||503).send(e);
    }
  },
  async lectureCompleted(req, res) {
    try {
      const lectures = await LectureService.setLectureAsDone(req.params.lectureId);
      return res.status(202).send(lectures);
    } catch (e) {
      return res.status(e.statusCode||503).send(e);
    }
  },
  async lecturesOfTeacher(req, res) {
    try {
      const lectures = await LectureService.getAllLecturesOfTeachers(req.params.teacherId);
      return res.status(202).send(lectures);
    } catch (e) {
      return res.status(e.statusCode||503).send(e);
    }
  },
  async lecturesOfCourse(req, res) {
    try {
      const lectures = await LectureService.getAllLecturesOfCourse(req.params.courseId);
      return res.status(202).send(lectures);
    } catch (e) {
      return res.status(e.statusCode||503).send(e);
    }
  },
};
