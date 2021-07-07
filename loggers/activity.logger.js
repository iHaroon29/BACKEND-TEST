const Activity=require("../models/loggerModels/activity.logger.model");
const LoggerError=require("../errors/logger.errors").loggerErrorMessage;
module.exports={
    async logActivityUpdated(oldData,newData,log_for,user){
        try{
            const data={
                activity_type:"update",
                data:{
                    oldData,newData
                },
                for:log_for.toLowerCase(),
                user:user
            };
            return await new Activity(data).save();
        }catch (e) {
            throw LoggerError("unable to log",e)
        }
    },
    async logActivityDeleted(oldData,log_for,user){
        try{
            const data={
                activity_type:"delete",
                data:{
                    oldData
                },
                for:log_for.toLowerCase(),
                user:user
            };
            return await new Activity(data).save();
        }catch (e) {
            throw LoggerError("unable to log",e)
        }
    },
    async logActivityCreatedNew(newData,log_for,user){
        try{
            const data={
                activity_type:"new",
                data:{
                    newData
                },
                for:log_for.toLowerCase(),
                user:user
            };
            return await new Activity(data).save();
        }catch (e) {
            throw LoggerError("unable to log",e)
        }
    }
};