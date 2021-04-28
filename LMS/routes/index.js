const express = require('express');
const router = express.Router();
const {Users}= require("./DataValidators");

/* GET home page. */
router.get('/validate', function(req, res) {
  Users(req.body)
      .then((data)=>{
        console.log("data",data)
      })
      .catch(err=>{
        console.log("err ", err);
      });


  return res.send("OK").status(200);
});

module.exports = router;
