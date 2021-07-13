const AdminValidator = require("../validators/admin.validators");
const bcrypt=require("../modules/bcrypt");
const AdminDAO=require("../dao/admin.user.dao");
const RejectErrorMessage=require("../errors/serviceErrorMessage").getRejectResponse;
const MailService=require("../modules/emailSender");
const TokenHandler=require("../modules/tokenHandler");
const OtpDao=require("../dao/otp.dao");

module.exports = {
  addNewAdminUser(adminDetails) {
    return new Promise((resolve,reject)=>{
      AdminValidator.addNewAdmin(adminDetails).then((validAdminDetails) => {
        bcrypt.genHash(validAdminDetails.password)
            .then(hashedPassword=>{
              validAdminDetails.password=hashedPassword;
              AdminDAO.addNewAdmin(validAdminDetails).then(savedAdminDetails => {
                resolve(savedAdminDetails);
              }).catch(err=>{
                reject({
                  message:err.message||"unable to add Admin",
                  statusCode:err.statusCode||503
                })
              })
            })

      }).catch(err=>{
        reject({
          message:"invalid data",
          statusCode:503,
          trace:err
        })
      })
    })
  },
  updateAdminDetails(adminId, newDetails) {
    return new Promise((resolve,reject)=>{
      AdminValidator.updateAdminDetails(newDetails)
          .then((validNewDetails) => {
                AdminDAO.updateAdminDetails(adminId, validNewDetails,{new: true})
                    .then((updatedDetails) => {
                      resolve(updatedDetails);
                    }).catch(err=>{
                  reject(RejectErrorMessage(err.message||"unable to update admin details"))
                })
              }
          ).catch(err=>reject(RejectErrorMessage("invalid data",400,err)))
    })
  },
  // updatePassword(adminId, newPassword) {
  //   return AdminValidator.updatePassword(newPassword).then((validPassword) => {
  //     return Admin.findByIdAndUpdate(
  //         adminId,
  //         { password: validPassword },
  //         { new: true }
  //     ).then((newDetails) => {
  //       return newDetails;
  //     });
  //   });
  // },
  deleteAdmin(adminId) {
    return new Promise((resolve,reject)=>{
      AdminDAO.deleteAdmin(adminId)
          .then((deletedDetails) => {
            resolve(deletedDetails);
          }).catch(err=>reject(err.message||"",err.statusCode||503,(err.statusCode)?"":err))
    });
  },
  allAdmins(){
    return AdminDAO.getAllAdmins();
  },
  getAdminDetailsById(adminId){
    return new Promise((resolve,reject)=>{
      AdminDAO.getAdminById(adminId).then(admin=>{
        resolve(admin);
      }).catch(err=>{
        reject(RejectErrorMessage("unable to get Admin",503,err));
      })
    })
  },
  getAdminUsingEmail(email) {
    return AdminDAO.getAdminByEmail(email);
  },
    async sendMailForPasswordUpdateAdmin(email){
        try{
            let TeacherDetails=await AdminDAO.getAdminByEmail(email)
                .then((teacherDetails)=>{
                    if(!teacherDetails){
                        throw ServiceErrorMessage("no admin found",400)
                    }
                    return teacherDetails
                });
            const Token=await TokenHandler.encodeWithoutRole(TeacherDetails._id,60*30);
            const otp=await OtpDao.createNewOtp(Token.token,"admin");
            const MailStatus=await MailService.sendMailWithOutAttachment(TeacherDetails.email,"update password link",
                `
            link is active for 30 minutes only
            your otp is ${otp}
          <a href="http://localhost:8004/admin/update/password/${Token.token}">click here to update password</a>
          `
            );
            return "mail sent";
        }catch (e) {
            throw RejectErrorMessage(e.message||"unable to update password",e.statusCode||503,e)
        }
    },
    /**
     * @return {string}
     */
    async PasswordUpdateOfAdmin(newPassword,token,otp){
        try{
            const decodedToken=await TokenHandler.decodeToken(token);
            await OtpDao.verifyOTP(token,otp,"admin ");
            const updatedPassword=await AdminDAO.updateAdminDetails(decodedToken.token_details,{password:newPassword},{new:true});
            return "password updated";
        }catch (e) {
            throw RejectErrorMessage(e.message||"unable to update password",e.statusCode||401,e)
        }
    }
};
