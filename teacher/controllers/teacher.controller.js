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
    },
    async updatePersonalDetailsOfTeacherByTeacherId(req,res){
        try{
            const TeacherDetails=await TeacherService.updateTeacherPersonalDetailsById(req.user.details._id,req.body);
            return  res.send(TeacherDetails);
        }catch (e) {
            console.log(e);
            return  res.status(e.statusCode||503).send(e);
        }
    },
    async forgetPasswordOfTeacherByTeacherId(req,res){
        try{
            if(!req.body.email){
                return  res.status(400).send("please provide an email");
            }
           await TeacherService.sendMailForPasswordUpdateTeacher(req.body.email);
            return  res.send("please check the mail");
        }catch (e) {
            console.log(e)
            return  res.status(e.statusCode||503).send(e);
        }
    },
    async updatePasswordOfTeacherByTeacherId(req,res){
        try{

           const updatedPassword=await TeacherService.PasswordUpdateOfTeacher(req.body.newPassword,req.params.token,req.body.otp);
            return  res.send(updatedPassword);
        }catch (e) {
            return  res.status(e.statusCode||503).send(e);
        }
    },

};