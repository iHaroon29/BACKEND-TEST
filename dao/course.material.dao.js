const CourseMaterial = require("../models/course.materials.model")
const DAOError = require("../errors/dao.errors").getDAOErrorMessage;

module.exports = {
    createCourseMaterial(courseDetails){
      return  new Promise((resolve,reject)=>{
           new CourseMaterial(courseDetails).save().then((savedDetails)=>{
            resolve(savedDetails)
           }).catch((error)=>{
            reject(DAOError("unable to create course material", 503, error));
           })
        })
    },
    deleteCourseMaterial(courseMaterialId){
        return new Promise((resolve, reject) => {
            CourseMaterial.findByIdAndDelete(courseMaterialId)
              .then((deletedcourseMaterial) => {
                if (!deletedcourseMaterial) {
                  reject(DAOError("no course material present", 400));
                }
                resolve(deletedcourseMaterial);
              })
              .catch((error) => {
                reject(DAOError("unable to delete course material", 503, error));
              });
          });
    },

    updateCourseMaterialByCourseMaterialId(courseMaterialId, newCourseMaterialDetails){
        return new Promise((resolve, reject) => {
            CourseMaterial.findByIdAndUpdate(courseMaterialId, newCourseMaterialDetails, {
              new: true,
            })
              .then((updatedDetails) => {
                if (!courseMaterialId) { 
                  reject(DAOError("no course material found", 400));
                }
                resolve(updatedDetails);
              })
              .catch((error) => {
                reject(DAOError("unable to update course material", 503, error));
              });
          });

    },

    getAllCourseMaterial(){
        return new Promise((resolve, reject) => {
            CourseMaterial.find()
              .then((allCourseMaterial) => {
                resolve(allCourseMaterial);
              })
              .catch((error) => {
                reject(DAOError("unable to get all course material", 503, error));
              });
          });
    },
    getCourseMaterialById(courseMaterialId){
        return new Promise((resolve, reject) => {
            CourseMaterial.findById(courseMaterialId)
              .then((allCourseMaterial) => {
                resolve(allCourseMaterial);
              })
              .catch((error) => {
                reject(DAOError("unable to get course material", 503, error));
              });
          });
    },
};