const route = require("express").Router();
const AdminController = require("../controllers/admin.controller");

route.put("/forget/password", AdminController.updatePassword);
route.delete("/admin/delete/:adminId", AdminController.deleteAdmin);
route.put("/admin/update/:adminId", AdminController.updateAdminDetails);
route.post("/admin/new", AdminController.addNewAdmin);
route.get("/admins/all",AdminController.getAllAdmins);
route.get("/admin/details/email/",AdminController.getAdminDetailsUsingEmail);
route.get("/admin/details/:adminId",AdminController.getAdminDetails);
module.exports = route;