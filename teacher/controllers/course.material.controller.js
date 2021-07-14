const CourseMaterialService=require("../../services/course.material.services");
module.exports={
    async getAllCourseMaterialsByCourseSectionId(req,res){
        try{
            const allCourseMaterials=await CourseMaterialService.getCourseMaterialByCourseSectionId(req.params.courseSectionId)
        }catch (e) {

        }
    },
    async getCourseMaterialsDetailsByCourseMaterialId(req,res){
        try{
            const courseMaterialDetails=await CourseMaterialService.getCourseMaterialByCourseMaterialId(req.params.courseMaterialId);
        }catch (e) {
        }
    },
    async updateCourseMaterialsDetailsByCourseMaterialId(req,res){
        try{
            const courseMaterialDetails=await CourseMaterialService.updateCourseMaterial(req.params.courseMaterialId);
        }catch (e) {

        }
    },
    async deleteCourseMaterialsDetailsByCourseMaterialId(req,res){
        try{
            const courseMaterialDetails=await CourseMaterialService.deleteCourseMaterial(req.params.courseMaterialId);
        }catch (e) {

        }
    },
    async addNewCourseMaterial(req,res){
        try{
            const courseMaterialDetails=await CourseMaterialService.createCourseMaterial(req.body);
        }catch (e) {

        }
    }
};
