const CoursesServices=require("../../services/course.services");

module.exports={
    async getCourseByCourseId(req,res){
        try{
            const course=await CoursesServices.getCourseByCourseId(req.params.courseId);
            return res.status(202).send(course);
        }
        catch (e) {
            console.log(e);
            return  res.status(400).send(e);

        }
    },
    
    async getAllCourse(req,res){
        try{
            const allCourses=await CoursesServices.getAllCourses();
            return res.status(200).send(allCourses);
        }
        catch (e) {
            return  res.status(400).send(e);
        }
    },
};