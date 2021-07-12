const ClassroomService=require("../../services/classrooms.services");
module.exports={
    
    async getClassroomByClassroomId(req,res){
        try {
            const updatedDetails=await ClassroomService.getClassroomDetailsByClassroomId(req.params.classroomId);
            return  res.status(202).send(updatedDetails);
        }catch (e) {
            console.log(e);
            return res.status(400).send(e);
        }
    },
};