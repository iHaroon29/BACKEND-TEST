const express = require("express");
const router = express.Router();
const { createLecture } = require("../controllers/LectureController");

router.post("/", createLecture);

module.exports = router;
