const AuthToken=require("../modules/authTokens");
const TeacherDao = require("../dao/teachers.dao")
const LoginSchema = require("../validators/AuthenticationAndAuthorization").MakeLogin;
const AuthErrorMessage = require("../errors/authentication.errors").getAuthErrorMessage;
const bcrypt=require("../modules/bcrypt");
module.exports={
    async getTeacherAuthToken(loginDetails){
        try {
            const validLoginDetails = await LoginSchema(loginDetails);

            let teacher = await TeacherDao.getTeacherByEmail(validLoginDetails.username)
            if(!teacher){
                 throw AuthErrorMessage("Invalid Credentials");

            }
            teacher=teacher[0];
            
            if (!await bcrypt.compareHash(validLoginDetails.password, teacher.password)) {
                throw AuthErrorMessage("Invalid Credentials");

            }
            return await AuthToken.tokenGenerateForTeacher({ email: student.email, id: teacher._id })
        }
        catch (e) {
            throw AuthErrorMessage(e.message || "Invalid Credentials");
        }
    }
};
