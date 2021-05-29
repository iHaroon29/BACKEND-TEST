const route=require("express").Router();
const AdminController=require("../controllers/Admin");

route.get("/course/all",AdminController.getAllCourse);
route.post("/course/new",AdminController.addNewCourse);
route.put("/course/all",AdminController.updateCourseById);
route.delete("/course/:id",AdminController.deleteCourseById);
route.post("/course_section/new",AdminController.addNewCourseSection);
