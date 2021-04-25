const router=require('express').Router();
const {User}=require("../models/users");
require("./RouteMiddlewares");



router.get("/",(req,res)=>{
    return res.send(User).status(202);
});

module.exports=router;