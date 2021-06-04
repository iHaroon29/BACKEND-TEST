const CourseSectionService=require("../services/CourseSections");

module.exports={
    getCourseSectionsByCourseId(){

    },
    async addNewCourseSection(req,res){
        try{
            const addedCourseSection=await CourseSectionService.addNewCourseSection(req.body);
            return res.status(200).send(addedCourseSection);
        }
        catch (e) {
            return  res.sendStatus(400);
        }
    },
    updateCourseSectionByCourseSectionId(){

    },
    deleteCourseSectionByCourseSectionId(){

    },
    getCourseSectionDetailsByCourseSectionId(){

    }

}