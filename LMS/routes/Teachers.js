const router = require("express").Router();

router.post("/assignment", (req, res) => {
  return res.send("newAssignmentFile").status(202);
});

router.put("/updateassignment", (req, res) => {
  return res.send("updateAssignmentFile").status(202);
});

module.exports = router;
