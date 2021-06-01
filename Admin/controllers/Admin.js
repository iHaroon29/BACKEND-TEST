const CoursesServices=require("../services/Coureses");
const CourseSectionService=require("../services/CourseSections");


module.exports={
    async addNewCourse(req,res){
        try{
            const course=await CoursesServices.addNewCourse(req.body);
            return res.status(202).send(course);
        }
        catch (e) {
            res.sendStatus(400);

        }
    },
    async getAllCourse(req,res){
        try{
            const allCourses=await CoursesServices.getAllCourses();
            return res.status(200).send(allCourses);
        }
        catch (e) {
            return  res.sendStatus(400);
        }
    },
    async updateCourseById(req,res){
        try{
            const updatedCourse=await CoursesServices.updateCourseById(req.body);
            return res.status(200).send(updatedCourse);
        }
        catch (e) {
            return  res.sendStatus(400);
        }
    },
    async deleteCourseById(req,res){
        try{
            const deletedCourse=await CoursesServices.deleteCourseById(req.param.id);
            return res.status(200).send(deletedCourse);
        }
        catch (e) {
            return  res.sendStatus(400);
        }
    },
    async addNewCourseSection(req,res){
        try{
            const addedCourseSection=await CourseSectionService.addNewCourseSection(req.body);
            return res.status(200).send(addedCourseSection);
        }
        catch (e) {
            return  res.sendStatus(400);
        }
    }

};