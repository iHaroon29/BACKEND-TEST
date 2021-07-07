const TeacherService=require("../../services/teacher.services");

module.exports={

    async getTeacherDetailsById(req,res){
        try{
            const TeacherDetails=await TeacherService.getTeacherPersonalDetailById(req.user.details._id);
            return  res.send(TeacherDetails);
        }catch (e) {
            console.log(e)
            return  res.status(e.statusCode||503).send(e);
        }
    }
};