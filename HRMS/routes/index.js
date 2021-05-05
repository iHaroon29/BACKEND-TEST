const express = require('express');
const router = express.Router();
const HrApplicantController=require("../controllers/HrApplicantController");
const HrAdvisorController=require("../controllers/HrAdvisorController").Controller;
const fileUpload=require("../modules/fileUploads");
const HrController=require("../controllers/HrController");

//======================================================================
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.post('/hr/new', function(req, res) {
    HrController.addNewHr(req.body)
        .then((registered)=>{
            return res.send(registered).status(202);
        })
        .catch((unableToRegister)=>{
            return res.send(unableToRegister).status(400);
        })
});





router.post("/hr/applicant/new",fileUpload.fields([{name:"cv",count:1},{name:"profile_picture",count:1}]),(req,res)=>{

    // appending files in the request body
    req.body.cv=req.files.cv[0];
    req.body.profile_picture=req.files.profile_picture[0];


    HrApplicantController.addNewHrApplicant(req.body)
        .then((createdNewHrApplicant)=>{
            return res.send(createdNewHrApplicant).status(202);
        })
        .catch((unableToCreateNewHrApplicant)=>{
            return res.send( unableToCreateNewHrApplicant).status(400);
        })


});


router.post("/teacher/new",(req,res)=>{
    require("./DataValidators").AddNewTeacherToTakeDemoClass(req.body)
        .then((validData)=>{
            // console.log(validData);
            HrAdvisorController.addTeacherToClass(validData)
                .then(()=>{
                    return res.send("created").status(202);
                }).catch((err)=>{
                return res.send(err).status(400);
            });
        }).catch(invalidData=>{

        // console.log(invalidData);
            return res.send(invalidData.details).status(400);
    })
});



module.exports = router;
