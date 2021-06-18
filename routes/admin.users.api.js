const route = require("express").Router();
const AdminController = require("../controllers/admin.controller");

route.put("/forget/password", AdminController.updatePassword);
route.delete("/admin/delete/:id", AdminController.deleteAdmin);
route.put("/admin/update/details", AdminController.updateAdminDetails);
route.post("/admin/new", AdminController.addNewAdmin);
route.get("/admin/all",AdminController.getAllAdmins);
route.get("/admin/details/:adminId",AdminController.getAdminDetails)
module.exports = route;