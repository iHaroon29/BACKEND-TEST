const Admin = require("../models/admin.model");
const AdminValidator = require("../utils/admin.validators");
module.exports = {
  addNewAdminUser(adminDetails) {
    return AdminValidator.addNewAdmin(adminDetails).then(
      (validAdminDetails) => {
        return new Admin(validAdminDetails).save().then((savedAdminDetails) => {
          return savedAdminDetails;
        });
      }
    );
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
  }
};
