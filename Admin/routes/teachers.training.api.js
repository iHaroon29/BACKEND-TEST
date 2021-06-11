const TeacherController=require("../controllers/teacher.training.controller");
const router=require("express").Router();

router.get("/training/teacher/details/all",TeacherController.getAllTrainingDetails);
router.get("/training/teacher/:teacherId/details/",TeacherController.getAllTrainingDetailsByTeacherId);
router.get("/training/teacher/details/trainer/:trainerId",TeacherController.getAllTrainingDetailsByTrainerId);
router.post("/training/teacher/new",TeacherController.addNewTeacherForTraining);
router.put("/training/teacher/update/:trainingId",TeacherController.updateTrainingDetails);
router.delete("/training/teacher/update/:trainingId",TeacherController.deleteTrainingDetails);

module.exports=router;