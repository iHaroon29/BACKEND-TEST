const Student=require("../models/students.model");
const DaoError=require("../errors/dao.errors").getDAOErrorMessage;

module.exports={
    getStudentByEmail(email){
        return new Promise((resolve,reject)=>{
            if(!email){
                reject(DaoError("email is required",400));
            }
            Student.find({"email":email})
                .then((studentDetails)=>{
                    if(!studentDetails){
                        reject(DaoError("no student found",400))
                    }
                    resolve(studentDetails);
                }).catch((err)=>{
                    reject(DaoError("unable to find student",503,err));
            })
        })
    }

};