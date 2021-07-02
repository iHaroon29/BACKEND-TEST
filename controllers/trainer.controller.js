const TrainerService=require("../services/trainers.service");
module.exports={
    async addNewTrainer(req,res){
        try{
          const addedTrainer=await TrainerService.addNewTrainer(req.body);
          return res.status(201).send(addedTrainer);
        }catch (e) {
            console.log(e)
            return  res.status(e.statusCode||503).send(e);
        }
    },
    async getAllTrainers(req,res){
        try{
          const addedTrainer=await TrainerService.getAllTrainers();
          return res.status(200).send(addedTrainer);
        }catch (e) {
            return  res.status(e.statusCode||503).send(e);
        }
    },
    async getTrainerById(req,res){
        try{
          const addedTrainer=await TrainerService.getTrainerDetailsById(req.params.trainerId);
          return res.status(200).send(addedTrainer);
        }catch (e) {
            return  res.status(e.statusCode||503).send(e);
        }
    },
    async updateTrainer(req,res){
        try{
          const addedTrainer=await TrainerService.updateTrainerDetailsById(req.params.trainerId,req.body);
          return res.status(202).send(addedTrainer);
        }catch (e) {
            return  res.status(e.statusCode||503).send(e);
        }
    },
    async deleteTrainer(req,res){
        try{
          const addedTrainer=await TrainerService.deleteTrainerById(req.params.trainerId);
          return res.status(203).send(addedTrainer);
        }catch (e) {
            return  res.status(e.statusCode||503).send(e);
        }
    },

};