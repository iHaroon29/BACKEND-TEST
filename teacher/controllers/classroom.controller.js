const ClassroomService=require("../../services/classrooms.services");
module.exports={
    getAllClassrooms(req,res){
        try {
            return res.status(200).send(ClassroomService.getClassroomsByTeacherId(req.user.details._id));
        }catch (e) {
            console.log(e)
            return  res.status(400).send(e);
        }
    },
    async getClassRoomDetailsByClassroomId(req,res){
        try {
            const classroom=await ClassroomService.getClassroomsByTeacherId(req.user.details._id);
            return res.status(200).send(ClassroomService.getClassroomDetailsByClassroomId(req.params.classroomId));
        }catch (e) {
            console.log(e);
            return  res.status(400).send(e);
        }
    }
};
