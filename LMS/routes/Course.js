const router = require("express").Router();
const {
  getAllCourse,
  getCourseWithId,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/CourseController");

router.get("/", getAllCourse);

router.get("/:id", getCourseWithId);

router.post("/", createCourse);

router.put("/edit/:id", updateCourse);

router.delete("/delete/:id", deleteCourse);

module.exports = router;
