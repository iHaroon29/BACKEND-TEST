const route=require("express").Router();
const CourseMaterialController=require("../controllers/course.material.controller");
const courseVerifyForTeacher=require("../middlewares/teacher.course.verify");
route.use(courseVerifyForTeacher);
route.post("/course/section/:courseSectionId/material/new",CourseMaterialController.addNewCourseMaterial);
route.put("/material/update/:courseMaterialId",CourseMaterialController.updateCourseMaterialsDetailsByCourseMaterialId);
route.delete("/material/delete/:courseMaterialId",CourseMaterialController.deleteCourseMaterialsDetailsByCourseMaterialId);
route.get("course/section/:courseSectionId/materials/all",CourseMaterialController.getAllCourseMaterialsByCourseSectionId);
route.get("/material/details/:courseMaterialId",CourseMaterialController.getCourseMaterialsDetailsByCourseMaterialId);

module.exports=route;