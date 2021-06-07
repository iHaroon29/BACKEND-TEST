const ClassroomService=require("../services/classrooms.services");
module.exports={
    async createNewClassroom(req,res){
        try {
            const savedClassDetails=await ClassroomService.addNewClassroom(req.body);
            return  res.status(202).send(savedClassDetails);
        }catch (e) {
            console.log(e);
            return res.sendStatus(400);
        }
    },
    async deleteClassroomWithGivenId(req,res){
        try{
            const deletedClassroom=await ClassroomService.deleteClassroomById(req.params.classroomId);
            return res.status(200).send(deletedClassroom);
        }catch (e) {
            console.log(e);
            return res.sendStatus(400);
        }
    },
    async getAllClassroom(req,res){
        try{
            const allClassrooms=await ClassroomService.getAllClassroom();
            return res.status(200).send(allClassrooms);
        }catch (e) {
            console.log(e);
            return res.sendStatus(400);
        }
    },
    async teacherForDemoClass(req,res){
        try{
            if(!req.body.teacher_id)
                throw new Error("Teacher id is required");
            const allClassrooms=await ClassroomService.addNewDemoClassTeacherToClass(req.params.classroomId,req.body.teacher_id);
            return res.status(200).send(allClassrooms);
        }catch (e) {
            console.log(e);
            return res.sendStatus(400);
        }
    }
};