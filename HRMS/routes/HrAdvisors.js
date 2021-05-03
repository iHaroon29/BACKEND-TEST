const router=require("express").Router();
router.get("/",(req,res)=>{
    return res.send("HR ADVISOR").status(200);
});

module.exports=router;