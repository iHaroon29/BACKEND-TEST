// const Activity=require("../models/loggerModels/activity.logger.model");
// const LoggerError=require("../errors/logger.errors").loggerErrorMessage;
// module.exports={
//     updatedCourse(oldData,newData){
//         const data={
//             activity_type:"update",
//             data:{
//                 oldData,newData
//             },
//             for:"admin"
//         };
//         return new Promise((resolve,reject)=>{
//             new Activity(data).save()
//                 .then(savedActivity=>{
//                     resolve(savedActivity);
//                 }).catch((err)=>{
//                 reject(LoggerError("unable to log",err));
//             })
//         })
//     },
//     deletedCourse(oldData){
//         const data={
//             activity_type:"delete",
//             data:{
//                 oldData
//             },
//             for:"admin"
//         };
//
//         return new Promise((resolve,reject)=>{
//             new Activity(data).save()
//                 .then(savedActivity=>{
//                     resolve(savedActivity);
//                 }).catch((err)=>{
//                 reject(LoggerError("unable to log",err));
//             })
//         })
//     },
//
// };