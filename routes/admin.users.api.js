const route = require("express").Router();
const AdminController = require("../controllers/admin.controller");

route.post("/forgot/password", AdminController.resetPassword);
route.put("/update/password/:token", AdminController.updatePassword);
route.delete("/admin/delete/:adminId", AdminController.deleteAdmin);
route.put("/admin/update/:adminId", AdminController.updateAdminDetails);
route.post("/admin/new", AdminController.addNewAdmin);
route.get("/admins/all",AdminController.getAllAdmins);
route.get("/admin/details/email/",AdminController.getAdminDetailsUsingEmail);
route.get("/admin/details/:adminId",AdminController.getAdminDetails);
module.exports = route;