const AdminService=require("../services/admin.users.service");
module.exports={
    async addNewAdmin(req,res){
        try{
            const adminDetails=await AdminService.addNewAdminUser(req.body);
            return res.status(202).send(adminDetails);
        }catch (e) {
            return res.sendStatus(400);
        }
    },
    async updateAdminDetails(req,res){
        try{
            const updatedAdmin=await AdminService.updateAdminDetails(req.body.id,req.body);
            return res.status(202).send(updatedAdmin);
        }catch (e) {
            return res.sendStatus(400);
        }
    },
    async deleteAdmin(req,res){
        try{
            const deletedAdmin=await AdminService.deleteAdmin(req.body.id);
            return res.status(202).send(deletedAdmin);
        }catch (e) {
            return res.sendStatus(400);
        }
    },
    async updatePassword(req,res){
        try{
            const updatedAdminDetails=await AdminService.updatePassword(req.body.id,req.body);
            return res.status(202).send(updatedAdminDetails);
        }catch (e) {
            return res.sendStatus(400);
        }
    }

};