const CourseSectionService=require("../services/course.section.services");

module.exports={
    async getAllCourseSectionsOfCourse(req,res){
        try{

            const allCourseSections=await CourseSectionService.getAllCourseSectionByCourseId(req.params.courseId);
            return res.status(200).send(allCourseSections);
        }
        catch (e) {
            // console.log(e);
            return  res.status(400).send(e);
        }
    },
    async addNewCourseSection(req,res){
        try{
            const addedCourseSection=await CourseSectionService.addNewCourseSection(req.params.courseId,req.body);
            return res.status(200).send(addedCourseSection);
        }
        catch (e) {
            console.log(e);
            return  res.status(400).send(e);
        }
    },
    async updateCourseSection(req,res){
        try{
            const updatedCourseSection=await CourseSectionService.updateCourseSection(req.params.courseSectionId,req.body);
            return res.status(200).send(updatedCourseSection);
        }
        catch (e) {
            console.log(e);
            return  res.status(400).send(e);
        }

    },
    async deleteCourseSection(req,res){
        try{
            const deletedCourse=await CourseSectionService.getCourseSectionDetails(req.params.courseSectionId);
            return res.status(200).send(deletedCourse);
        }
        catch (e) {
            console.log(e);
            return  res.status(400).send(e);
        }
    },
    async getCourseSectionDetails(req,res){
        try{
            const courseSectionDetails=await CourseSectionService.getCourseSectionDetails(req.params.courseSectionId);
            return res.status(200).send(courseSectionDetails);
        }
        catch (e) {
            console.log(e);
            return  res.status(400).send(e);
        }
    },
    async getAllCourseSection(req, res){
        try{
            const allCourses=await CourseSectionService.getAllCourseSections();
            return res.status(200).send(allCourses);
        }
        catch (e) {
            console.log(e);
            return  res.status(400).send(e);
        }
    }

};