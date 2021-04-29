const router=require('express').Router();
const CourseSections = require('../models/courseSections')
require("./RouteMiddlewares");
const op = require('sequelize')


router.get('/', (req, res) => {
     CourseSections.findAll().then((data) => {
      return  res.send(data).status(202)
    }).catch((err) => {console.log(err)})

    

})





module.exports=router;