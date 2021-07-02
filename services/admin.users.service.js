const Admin = require("../models/admin.model");
const AdminValidator = require("../validators/admin.validators");
const bcrypt=require("../modules/bcrypt");

module.exports = {
  addNewAdminUser(adminDetails) {
    return new Promise((resolve,reject)=>{
      AdminValidator.addNewAdmin(adminDetails).then((validAdminDetails) => {
        bcrypt.genHash(validAdminDetails.password)
            .then(hashedPassword=>{
              validAdminDetails.password=hashedPassword;
              new Admin(validAdminDetails).save().then(savedAdminDetails => {
                resolve(savedAdminDetails);
              }).catch(err=>{
                reject({
                  message:"unable to add add Admin",
                  statusCode:503,
                  trace:err
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
    return AdminValidator.updateAdminDetails(newDetails).then(
        (validNewDetails) => {
          return Admin.findByIdAndUpdate(adminId, validNewDetails, {
            new: true,
          }).then((updatedDetails) => {
            return updatedDetails;
          });
        }
    );
  },
  updatePassword(adminId, newPassword) {
    return AdminValidator.updatePassword(newPassword).then((validPassword) => {
      return Admin.findByIdAndUpdate(
          adminId,
          { password: validPassword },
          { new: true }
      ).then((newDetails) => {
        return newDetails;
      });
    });
  },
  deleteAdmin(adminId) {
    return Admin.findByIdAndDelete(adminId).then((newDetails) => {
      return newDetails;
    });
  },
  allAdmins(){
    return Admin.find()
  },
  getAdminDetailsById(adminId){
    return Admin.findById(adminId).then(admin=>{
      if(!admin){
        throw new Error("No User Found");
      }
      return admin;
    })
  },
  getAdminUsingEmail(email){
    return new Promise((resolve,reject)=>{
      const filter={};
      filter["email"]=email;
      Admin.find(filter)
          .then(admin=>{
            if(!admin || !admin[0]){
              reject({
                message:"no admin found",
                trace:"no trace",
                statusCode:204
              })
            }
            resolve(admin[0]);
          }).catch(err=>{
        reject({
          message:"unable to find admin",
          trace:err,
          statusCode:503
        })
      })
    })
  }
};
