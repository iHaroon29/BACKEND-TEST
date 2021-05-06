const router=require('express').Router();
const CourseSections = require('../models/mongodb/courseSections')
require("./RouteMiddlewares");
const op = require('sequelize')
const bcrypt = require('bcrypt');
const Student  = require('../models/mongodb/students');

// router.get('/', (req, res) => {
//      CourseSections.findAll().then((data) => {
//       return  res.send(data).status(202)
//     }).catch((err) => {console.log(err)})
// });

router.get('/',async (req,res) => {
    const students = await Student.find() ;
    res.send(students);
});

//Get All Assignment related to a class
router.get('/assignments/class/:id' , async(req,res)=> {
    
});


router.post('/',async (req,res) => {
    let student = await Student.findOne({ email: req.body.email });
    if (student) return res.status(400).send("student already registered");
    
     student = await Student.create({
        name: req.body.name,
        email: req.body.email,
        parent_name: req.body.parent_name,
        parent_relation: req.body.parent_relation,
        active: req.body.active,
        password: req.body.password,
    });
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(student.password , salt);
    await student.save(); 
    console.log(student);
    res.send(student);
});

router.put('/edit/:id',async (req,res) => {
    let student = await Student.find({_id: req.params.id});
    if(!student)
        return res.status(404).send("Given ID was not found");  
  
    student = await student.findByIdAndUpdate(req.params.id, req.body,{ new: true });
    await student.save();
    console.log(student);
    res.send(student);
});

router.delete('/delete/:id',async (req,res) => {
    
    const student = await Student.deleteOne({_id:req.params.id});
    if(!student )
        return res.status(404).send("Given ID was not found");//404 is error not found
    
    res.send(student);
});

module.exports=router;