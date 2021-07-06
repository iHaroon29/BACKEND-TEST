const TrainerController=require("../controllers/trainer.controller");
const route=require("express").Router();

route.get("/trainer/details/:trainerId",TrainerController.getTrainerById);
route.get("/trainers/all",TrainerController.getAllTrainers);
route.post("/trainer/new",TrainerController.addNewTrainer);
route.put("/trainer/update/:trainerId",TrainerController.updateTrainer);
route.delete("/trainer/delete/:trainerId",TrainerController.deleteTrainer);

module.exports=route;