const route=require("express").Router();
const LectureController=require("../controllers/lectures.controller");

route.get("/course/:courseId/lectures/all",LectureController.getAllLecturesByCourseId);
route.get("/classroom/:classroomId/lectures/all",LectureController.getAllLecturesByClassroomId);
route.post("/lecture/new",LectureController.createNewLecture);
route.put("/lecture/update/:lectureId",LectureController.updateLectureByLectureId);
route.delete("/lecture/delete/:lectureId",LectureController.deleteLectureByLectureId);

module.exports=route;