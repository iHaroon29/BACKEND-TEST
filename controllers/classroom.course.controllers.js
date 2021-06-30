const ClassroomCourseService=require("../services/classroom.course.services");
module.exports={
    async addNewCourseToClassroom(req,res){
        try{
            const addedCourse=await ClassroomCourseService
                .addCourseInClassroom(req.body.classroomId,req.body.courseId,req.body.teacherId);
            return  res.status(202).send(addedCourse)
        }catch (e) {
            return res.status(e.statusCode||400).send(e.message||"bad request");
        }
    },
    async deleteCourseFromClassroom(req,res){
        try{
            const addedCourse=await ClassroomCourseService
                .removeCourseFromClassroom(req.body.classroomId,req.body.courseId);
            return  res.status(202).send(addedCourse)
        }catch (e) {
            return res.status(e.statusCode||400).send(e.message||"bad request");
        }
    },
};