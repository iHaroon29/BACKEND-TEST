const router=require("express").Router();
const {AdminAuthValidator}=require("./RouteMiddlewares");
/*
*
* adding middleware to check if the user is an Admin or not
*
*/
router.use(AdminAuthValidator);
router.get('/',(req,res)=>{
    return res.send("OK").status(200);

});
router.get('/dashboard',(
    req,res)=>{

});




module.exports=router;