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
    },
    getAllActivity(){
        return new Promise((resolve,reject)=>{
            Activity.find()
                .then(allActivities=>{
                    resolve(allActivities);
                })
                .catch(err=>{
                    reject(LoggerError("unable to get all activities",err));
                })
        })
    },
    getActivityByForAndType(activity_for,activity_type){
        const filter={};
        if(activity_for){
            filter.for=activity_for;
        }
        if(activity_type){
            filter.activity_type=activity_type;
        }
        return new Promise((resolve,reject)=>{
            Activity.find(filter)
                .then(allActivities=>{
                    resolve(allActivities);
                })
                .catch(err=>{
                    reject(LoggerError("unable to get all activities",err));
                })
        })
    },
    getActivityByUserIdAndUserRole(user_id,user_role){
        const filter={};
        if(user_id){
            filter.user._id=user_id;
        }
        if(user_role){
            filter.user.role=user_role;
        }
        return new Promise((resolve,reject)=>{
            Activity.find(filter)
                .then(allActivities=>{
                    resolve(allActivities);
                })
                .catch(err=>{
                    reject(LoggerError("unable to get all activities",err));
                })
        })
    },
    getActivityByActivityId(activity_id){
        return new Promise((resolve,reject)=>{
            Activity.findById(activity_id)
                .then(activity=>{
                    resolve(activity);
                })
                .catch(err=>{
                    reject(LoggerError("unable to get all activities",err));
                })
        })
    }
};