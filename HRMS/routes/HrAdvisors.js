const router=require("express").Router();
const HrAdvisorController=require("../controllers/HrAdvisorController").Controller;

router.get("/",(req,res)=>{
    return res.send("HR ADVISOR").status(200);
});

router.post("/classroom/demo/class/teacher/new/",HrAdvisorController.addTeacherToClass);


router.get("/teacher/available",(req,res)=>{

    HrAdvisorController.getAllAvailableTeachers(req.body)
        .then((data)=>{
            return res.send(data).status(200);
        }).catch((err)=>{
        return res.send(err).status(400);
    })
});













module.exports=router;