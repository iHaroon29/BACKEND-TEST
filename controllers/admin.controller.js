const AdminService=require("../services/admin.users.service");
module.exports={
    async addNewAdmin(req,res){
        try{
            const adminDetails=await AdminService.addNewAdminUser(req.body);
            return res.status(202).send(adminDetails);
        }catch (e) {
            return res.status(400).send(e);
        }
    },
    async updateAdminDetails(req,res){
        try{
            const updatedAdmin=await AdminService.updateAdminDetails(req.body.id,req.body);
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
            const updatedAdminDetails=await AdminService.updatePassword(req.body.id,req.body);
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
            return  res.send(details);
        }catch (e) {
            return res.status(400).send(e);
        }
    }

};