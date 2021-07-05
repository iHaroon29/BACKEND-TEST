const Admin = require("../models/admin.model");
const AdminValidator = require("../validators/admin.validators");
const bcrypt=require("../modules/bcrypt");
const AdminDAO=require("../dao/admin.user.dao");
const RejectErrorMessage=require("../errors/serviceErrorMessage").getRejectResponse;

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
  }
};
