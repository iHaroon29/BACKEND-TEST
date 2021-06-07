const route=require("express").Router();
const CourseController=require("../controllers/Courses");
const CourseSectionController=require("../controllers/CourseSection");
const AdminController=require("../controllers/admin.controller");
const ClassroomController=require("../controllers/classroom.controller");
route.get("/course/all",CourseController.getAllCourse);
route.post("/course/new",CourseController.addNewCourse);
route.put("/course/all",CourseController.updateCourseById);
route.delete("/course/:id",CourseController.deleteCourseById);
route.post("/course_section/new",CourseSectionController.addNewCourseSection);
//============= ADMIN==================
route.put("/forget/password",AdminController.updatePassword);
route.delete("/admin/delete/:id",AdminController.deleteAdmin);
route.put("/admin/update/details",AdminController.updateAdminDetails);
route.post("/admin/new",AdminController.addNewAdmin);
//============= ADMIN==================

//==================== CLASSROOM================
route.post("/classroom/new",ClassroomController.createNewClassroom);
route.delete("/classroom/:classroomId",ClassroomController.deleteClassroomWithGivenId);
route.get("/classroom/all",ClassroomController.getAllClassroom);
route.post("/classroom/demo/teacher/new/:classroomId",ClassroomController.teacherForDemoClass);
//==================== CLASSROOM================

const Classroom=require("../../models/mongodb/classrooms");

route.get("/test",(req,res)=>{
    const studentID=1;
    const dN={};
    dN["enrolled_students."+studentID]={$exists:true};
    console.log(dN);
    Classroom.find(dN)
        .then(data=>{
            return res.status(200).send(data);
        })
});

module.exports=route;
