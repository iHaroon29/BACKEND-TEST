const express = require("express");
const router = express.Router();
const {
  createCourseSection,
} = require("../controllers/CourseSectionController");

router.post("/", createCourseSection);

module.exports = router;
