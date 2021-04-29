const router = require("express").Router();

router.post("/assignment/new", (req, res) => {
  return res.send("newAssignmentFile").status(202);
});

router.put("/assignment/update", (req, res) => {
  return res.send("updateAssignmentFile").status(202);
});

module.exports = router;
