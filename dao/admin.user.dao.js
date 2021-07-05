const Admin=require("../models/admin.model");
const DaoErrorMessage=require("../errors/dao.errors").getDAOErrorMessage;

module.exports={
    async addNewAdmin(adminDetails){
        try{
            return  await new Admin(adminDetails).save();
        }catch (e) {
            if(e.code===11000){
                throw DaoErrorMessage("Email already in use",406);
            }
            throw DaoErrorMessage("unable to add New User",400,e);
        }
    },
    getAllAdmins(){
        return Admin.find()
            .then(allAdmins=>allAdmins)
            .catch(err=>{
                throw DaoErrorMessage("unable to get all Admins",400,err);
            })
    },
    getAdminById(adminId){
        return Admin.findById(adminId)
            .then(adminDetails=>{
                if(!adminDetails){
                    throw DaoErrorMessage("no admin found",400);
                }
                return adminDetails
            })
            .catch(err=>{
                throw DaoErrorMessage("unable to get all Admins",400,err);
            })
    },
    updateAdminDetails(adminId,newAdminDetails){
        return new Promise((resolve,reject)=>{
            Admin.findByIdAndUpdate(adminId,newAdminDetails,{new:true})
                .then((updatedAdminDetails)=>{
                    resolve(updatedAdminDetails);
                }).catch((err)=>{
                reject(DaoErrorMessage(err,400,err))
            })
        })
    },
    deleteAdmin(adminId){
        return new Promise((resolve,reject)=>{
            Admin.findByIdAndDelete(adminId)
                .then((deletedDetails)=>{
                    resolve(deletedDetails);
                }).catch((err)=>{
                reject(DaoErrorMessage(err,400,err))
            })
        })
    },
    getAdminByEmail(emailId){
        return new Promise((resolve,reject)=>{
            Admin.find({email:emailId})
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
                reject(DaoErrorMessage("unable to find admin", 400,err))
            })
        })
    }
};