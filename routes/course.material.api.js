const route=require("express").Router();
const CourseMaterialController=require("../controllers/course.material.controller");

route.post("/course/:courseId/material/new",CourseMaterialController.createCourseMaterial);
route.get("/course/material/:courseMaterialId",CourseMaterialController.getCourseMaterialByCourseId);
route.get("/course/material/all",CourseMaterialController.getAllCourseMaterial);
route.put("/course/material/update/:courseMaterialId",CourseMaterialController.updateCourseMaterial);
route.delete("/course/material/delete/:courseMaterialId",CourseMaterialController.deleteCourseMaterial);

module.exports=route;
