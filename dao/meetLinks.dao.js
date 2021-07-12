const DAOError=require("../errors/dao.errors").getDAOErrorMessage;
const MeetLink = require("../models/meetlinks.model");

module.exports = {
    addNewMeetLink(meetLinkDetails){
        return new Promise((resolve, reject) => {
            new MeetLink(meetLinkDetails)
                .save()
                .then((savedDetails) => {
                    resolve(savedDetails);
                })
                .catch((error) => {
                    reject(DAOError("unable to create new meet-link", 503, error));
                });
        });

    },

    UpdateMeetLinkById(meetLinkId, newMeetLinkDetails){
        return new Promise((resolve, reject) => {
            MeetLink.findByIdAndUpdate(meetLinkId, newMeetLinkDetails, {
                new: true,
            })
                .then((updatedDetails) => {
                    if (!meetLinkId) {
                        reject(DAOError("unable to find meet-link", 400));
                    }
                    resolve(updatedDetails);
                })
                .catch((error) => {
                    reject(DAOError("unable to update meet-link", 503, error));
                });
        });
    },

    deleteMeetLinkById(meetLinkId){
        return new Promise((resolve, reject) => {
            MeetLink.findByIdAndDelete(meetLinkId)
                .then((deletedMeetLink) => {
                    if (!deletedMeetLink) {
                        reject(DAOError("no meet-link present", 400));
                    }
                    resolve(deletedMeetLink);
                })
                .catch((error) => {
                    reject(DAOError("unable to delete meet-link", 503, error));
                });
        });
    },

    getAllMeetLinks(){
        return new Promise((resolve, reject) => {
            MeetLink.find()
                .then(async (classroomsDetails) => {

                    resolve(classroomsDetails);
                })
                .catch((error) => {
                    reject(DAOError("unable to update assignment", 503, error));
                });
        });
    },

    getMeetLinkById(meetLinkId){
      return new Promise((resolve, reject)=>{
        MeetLink.findById(meetLinkId).then((meetDetails)=>{
            if(!meetDetails){
                reject("no meet link details found", 400)
            }
            resolve(meetDetails)
        }).catch((error)=>{
            reject(DAOError("unable to find note",503,error))
        })
    })
    }
}