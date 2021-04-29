const router = require("express").Router();

router.post("/student", (req, res) => {
  return res.send("newStudentFile").status(202);
});

router.post("/teacher", (req, res) => {
  return res.send("newTeacherFile").status(202);
});

module.exports = router;
