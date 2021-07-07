const route=require("express").Router();
const TrainingController=require("../controllers/training.controller");

route.put("/training/update/:trainingId",TrainingController.updateTrainingUsingTrainingId);
route.delete("/training/delete/:trainingId",TrainingController.deleteTrainingUsingTrainingId);
route.post("/training/new",TrainingController.createNewTraining);
route.get("/training/details/:trainingId",TrainingController.getTrainingUsingTrainingId);
route.get("/training/role",TrainingController.getTrainingUsingTrainingRole);
route.get("/training/all",TrainingController.getAllTraining);

module.exports=route;