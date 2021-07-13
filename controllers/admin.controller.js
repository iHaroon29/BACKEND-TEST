const AdminService=require("../services/admin.users.service");
module.exports={
    async addNewAdmin(req,res){
        try{
            const adminDetails=await AdminService.addNewAdminUser(req.body);
            return res.status(202).send(adminDetails);
        }catch (e) {
            return res.status(e.statusCode||400).send(e);
        }
    },
    async updateAdminDetails(req,res){
        try{
            const updatedAdmin=await AdminService.updateAdminDetails(req.params.adminId,req.body);
            return res.status(202).send(updatedAdmin);
        }catch (e) {
            return res.status(400).send(e);
        }
    },
    async deleteAdmin(req,res){
        try{
            const deletedAdmin=await AdminService.deleteAdmin(req.params.adminId);
            return res.status(202).send(deletedAdmin);
        }catch (e) {
            return res.status(400).send(e);
        }
    },
    async updatePassword(req,res){
        try{
            if(!req.body.password){
                return res.status(400).send("password is required");
            }
            if(!req.body.otp){
                return res.status(400).send("otp is required");
            }
            if(!req.params.token){
                return res.status(400).send("reset token is required");
            }
            const updatedAdminDetails=await AdminService.PasswordUpdateOfAdmin(req.body.password,req.params.token,req.body.otp);
            return res.status(202).send(updatedAdminDetails);
        }catch (e) {
            return res.status(e.statusCode|| 400).send(e);
        }
    },
    async resetPassword(req,res){
        try{
            if(!req.body.email){
                return res.status(400).send("email is required");
            }
            const updatedAdminDetails=await AdminService.sendMailForPasswordUpdateAdmin(req.body.email);
            return res.status(202).send(updatedAdminDetails);
        }catch (e) {
            return res.status(400).send(e);
        }
    },
    async getAllAdmins(req,res){
        try{
            const allAdmins=await AdminService.allAdmins();
            return  res.send(allAdmins);
        }catch (e) {
            return res.status(400).send(e);
        }
    },
    async getAdminDetails(req,res){
        try{
            const details=await AdminService.getAdminDetailsById(req.params.adminId);
            return  res.status(200).send(details);
        }catch (e) {
            return res.status(400).send(e);
        }
    },
    async getAdminDetailsUsingEmail(req,res){
        try{
            const details=await AdminService.getAdminUsingEmail(req.body.email);
            return  res.status(200).send(details);
        }catch (e) {
            return res.status(400).send(e);
        }
    }

};