const CoursesServices=require("../services/course.services");

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
    async addNewCourse(req,res){
        try{
            const course=await CoursesServices.addNewCourse(req.body);
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
    async updateCourseById(req,res){
        try{
            const updatedCourse=await CoursesServices.updateCourseById(req.params.courseId,req.body);
            return res.status(200).send(updatedCourse);
        }
        catch (e) {
            return  res.status(400).send(e);
        }
    },
    async deleteCourseById(req,res){
        try{
            const deletedCourse=await CoursesServices.deleteCourseById(req.params.id);
            return res.status(200).send(deletedCourse);
        }
        catch (e) {
            return  res.status(400).send(e);
        }
    },

};