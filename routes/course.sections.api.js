const route = require("express").Router();
const CourseSectionController = require("../controllers/course.section.controller");

route.get("/course/:courseId/sections/all",CourseSectionController.getAllCourseSectionsOfCourse);
route.get("/course/:courseId/section/details/:courseSectionId",CourseSectionController.getCourseSectionDetails);
// route.get("/course/sections/all", CourseSectionController.getAllCourseSections);
route.post("/course/:courseId/section/new",CourseSectionController.addNewCourseSection);
route.put("/course/:courseId/section/update/:courseSectionId",CourseSectionController.updateCourseSection);
route.delete("/course/:courseId/section/delete/:courseSectionId",CourseSectionController.deleteCourseSection);

module.exports = route;