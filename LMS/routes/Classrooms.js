const router=require('express').Router();

const bcrypt = require('bcrypt');
const {Classroom}  = require('../models/classrooms');

router.get('/',async (req,res) => {
    const classrooms = await Classroom.findAll() ;
    res.send(classrooms);
});

router.get('/:id',async (req,res) => {
    const classroom = await Classroom.findOne({ where: { id: req.params.id } });
    if(!classroom) return res.status(400).send('Invalid Classroom');

    res.send(classrooms);
});

router.post('/',async (req,res) => {
    const classroom = await Classroom.findOne({ where: { name: req.body.name } });
    if(classroom) return res.status(400).send('Classroom already registered');
    
    const classroom = await Classroom.create({  
        name: req.body.name,
        status: req.body.status,
    });

    await classroom.save(); 
    console.log(classroom);
    res.send(classroom);
});

router.put('/edit/:id',async (req,res) => {
    const classroom = await Classroom.findOne({ where: { id: req.params.id } });
    if(!classroom) return res.status(400).send('Invalid Classroom');

    classroom.name=req.body.name
    classroom.status= req.body.status

    await classroom.save(); 
    console.log(classroom);
    res.send(classroom);
});

router.delete('/delete/:id',async (req,res) => {
    const classroom = await Classroom.findOne({ where: { id: req.params.id } });
    await classroom.destroy();
    res.send(classroom);
});

module.exports=router;