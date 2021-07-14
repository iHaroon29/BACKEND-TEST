const route=require("express").Router();
const LectureAttendanceController=require("../controllers/lecture.attendances.controller");

route.post("/course/:courseId/lecture/:lectureId",LectureAttendanceController.markAsPresent);
route.get("/get/attendance/lecture/:lectureId",LectureAttendanceController.getAttendanceOfLecture);
module.exports=route;