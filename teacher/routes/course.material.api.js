const route=require("express").Router();
const CourseMaterialController=require("../controllers/course.material.controller");
route.post("/course/:courseId/section/:courseSectionId/material/new",CourseMaterialController);
route.put("/course/:courseId/section/:courseSectionId/material/update/:courseMaterialId",CourseMaterialController);
route.get("/course/:courseId/section/:courseSectionId/materials/all",CourseMaterialController);
route.get("/course/:courseId/section/:courseSectionId/materials/details/:courseMaterialId",CourseMaterialController);

module.exports=route;