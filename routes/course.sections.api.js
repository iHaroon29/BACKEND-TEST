const route = require("express").Router();
const CourseSectionController = require("../controllers/course.section.controller");

route.get("/course/:courseId/section/all",CourseSectionController.getAllCourseSectionsOfCourse);
route.get("/course/:courseId/section/:courseSectionId",CourseSectionController.getCourseSectionDetails);
route.get("/course/section/all", CourseSectionController.getAllCourseSections);
route.post("/course/:courseId/section/new",CourseSectionController.addNewCourseSection);
route.put("/course/:courseId/section/:courseSectionId",CourseSectionController.updateCourseSection);
route.delete("/course/:courseId/section/:courseSectionId",CourseSectionController.deleteCourseSection);

module.exports = route;