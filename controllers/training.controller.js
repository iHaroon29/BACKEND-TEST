const TrainingService=require("../services/training.services");
module.exports={
    async createNewTraining(req,res){
        try{
            const trainingDetails=await TrainingService.addNewTraining(req.body);
            return res.status(201).send(trainingDetails);
        }catch (e) {
            return res.status(e.statusCode||500).send(e);
        }
    },
    async updateTrainingUsingTrainingId(req,res){
        try{
            const trainingDetails=await TrainingService.updateTrainingUsingTrainingID(req.params.trainingId,req.body);
            return res.status(201).send(trainingDetails);
        }catch (e) {
            return res.status(e.statusCode||500).send(e);
        }
    },
    async deleteTrainingUsingTrainingId(req,res){
        try{
            const trainingDetails=await TrainingService.deleteTrainingUsingTrainingID(req.params.trainingId);
            return res.status(201).send(trainingDetails);
        }catch (e) {
            return res.status(e.statusCode||500).send(e);
        }
    },
    async getTrainingUsingTrainingId(req,res){
        try{
            const trainingDetails=await TrainingService.getTrainingUsingTrainingID(req.params.trainingId);
            return res.status(201).send(trainingDetails);
        }catch (e) {
            return res.status(e.statusCode||500).send(e);
        }
    },
    async getTrainingUsingTrainingRole(req,res){
        try{
            const trainingDetails=await TrainingService.getTrainingUsingTraineeRole(req.body.role);
            return res.status(201).send(trainingDetails);
        }catch (e) {
            return res.status(e.statusCode||500).send(e);
        }
    },
    async getAllTraining(req,res){
        try{
            const trainingDetails=await TrainingService.getAllTrainings();
            return res.status(200).send(trainingDetails);
        }catch (e) {
            return res.status(e.statusCode||500).send(e);
        }
    }
};