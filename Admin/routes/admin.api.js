const route=require("express").Router();
const CourseController=require("../controllers/Courses");
const CourseSectionController=require("../controllers/CourseSection")
route.get("/course/all",CourseController.getAllCourse);
route.post("/course/new",CourseController.addNewCourse);
route.put("/course/all",CourseController.updateCourseById);
route.delete("/course/:id",CourseController.deleteCourseById);
route.post("/course_section/new",CourseSectionController.addNewCourseSection);
module.exports=route;
