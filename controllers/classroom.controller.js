const ClassroomService=require("../services/classrooms.services");
module.exports={
    async createNewClassroom(req,res){
        try {
            const savedClassDetails=await ClassroomService.addNewClassroom(req.body);
            return  res.status(202).send(savedClassDetails);
        }catch (e) {
            console.log(e);
            return res.status(400).send(e);
        }
    },
    async deleteClassroomWithGivenId(req,res){
        try{
            const deletedClassroom=await ClassroomService.deleteClassroomById(req.params.classroomId);
            return res.status(200).send(deletedClassroom);
        }catch (e) {
            console.log(e);
            return res.status(400).send(e);
        }
    },
    async getAllClassroom(req,res){
        try{
            const allClassrooms=await ClassroomService.getAllClassroom();
            return res.status(200).send(allClassrooms);
        }catch (e) {
            console.log(e);
            return res.status(400).send(e);
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
            return res.status(400).send(e);
        }
    },
    async updateClassroomDetails(req,res){
        try {
            const updatedDetails=await ClassroomService.updateClassroomById(req.params.classroomId,req.body);
            return  res.status(202).send(updatedDetails);
        }catch (e) {
            console.log(e);
            return res.status(400).send(e);
        }
    },
    async getClassroomByClassroomId(req,res){
        try {
            const updatedDetails=await ClassroomService.getClassroomDetailsByClassroomId(req.params.classroomId);
            return  res.status(202).send(updatedDetails);
        }catch (e) {
            console.log(e);
            return res.status(400).send(e);
        }
    },
    async makeClassroomLive(req,res){
        try {
            const updatedDetails=await ClassroomService.makeClassroomLiveUsingClassroomId(req.params.classroomId);
            return  res.status(202).send(updatedDetails);
        }catch (e) {
            return res.status(e.statusCode||400).send(e);
        }
    },
    async getAllDemoClasses(req,res){
        try {
            const allDemoClasses=await ClassroomService.getAllDemoClassroom();
            return  res.status(202).send(allDemoClasses);
        }catch (e) {
            return res.status(e.statusCode||400).send(e);
        }
    },
    async getClassroomsOfStudents(req,res){
        try {
            const allDemoClasses=await ClassroomService.getClassroomByStudentId();
            return  res.status(202).send(allDemoClasses);
        }catch (e) {
            return res.status(e.statusCode||400).send(e);
        }
    }
};