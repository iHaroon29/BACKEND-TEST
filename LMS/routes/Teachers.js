const router = require("express").Router();
const Assignment = require("../models/mongodb/assignments");

router.get("/", (req, res) => {
  Assignment.find()
    .then((data) => {
      return res.send(data).status(202);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/assignment/new", (req, res) => {
  return res.send("newAssignmentFile").status(202);
});

router.put("/assignment/update", (req, res) => {
  return res.send("updateAssignmentFile").status(202);
});

module.exports = router;
