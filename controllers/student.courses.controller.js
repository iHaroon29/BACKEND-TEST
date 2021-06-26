const StudentCourseService=require("../services/student.courses.service");
module.exports={
    async addCourseToStudentClassroom(req,res){
        try{
            const classroomDetails=await StudentCourseService.addCourseToStudentClassroom(req.params.studentId,req.params.courseId);
            // console.log(req.params.studentId,req.params.courseId)
            return  res.status(202).send(classroomDetails);
        }catch (e) {
            console.log(e)
            return res.status(400).send(e);
        }
    },
    async removeCourseFromStudentClassroom(req,res){
        try{
            const classroomDetails=await StudentCourseService.removeCourseFromStudentClassroom(req.params.studentId,req.params.courseId);
            return  res.status(202).send(classroomDetails);
        }catch (e) {
            return res.status(400).send(e);
        }
    },
};