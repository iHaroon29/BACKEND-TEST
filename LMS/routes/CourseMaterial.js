const express = require("express");
const router = express.Router();
const {
  createCourseMaterial,
} = require("../controllers/CourseMaterialController");

router.post("/", createCourseMaterial);

module.exports = router;
