const express = require("express");
const router = express.Router();
const {
  createLecAttendance,
} = require("../controllers/LectureAttendanceController");

router.post("/", createLecAttendance);

module.exports = router;
