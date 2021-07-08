const DAOError=require("../errors/dao.errors").getDAOErrorMessage;
const MeetLink = require("../models/meetlinks.model")
const Classroom = require("./classroom.dao");

module.exports = {
    addNewMeetLink(){
        return new Promise((resolve, reject) => {
            new MeetLink(meetLinkDetails)
              .save()
              .then((savedDetails) => {
                resolve(savedDetails);
              })
              .catch((error) => {
                reject(DAOError("unable to create meetlink", 503, error));
              });
          });

    },

    UpdateMeetLinkById(meetLinkId, newmeetLinkDetails){
        return new Promise((resolve, reject) => {
            MeetLink.findByIdAndUpdate(meetLinkId, newmeetLinkDetails, {
              new: true,
            })
              .then((updatedDetails) => {
                if (!meetLinkId) {
                  reject(DAOError("unable to find meetlink", 400));
                }
                resolve(updatedDetails);
              })
              .catch((error) => {
                reject(DAOError("unable to update meetlink", 503, error));
              });
          });
    },

    deleteMeetLinkById(meetLinkId){
        return new Promise((resolve, reject) => {
            MeetLink.findByIdAndDelete(meetLinkId)
              .then((deletedMeetLink) => {
                if (!deletedMeetLink) {
                  reject(DAOError("no meetlink present", 400));
                }
                resolve(deletedMeetLink);
              })
              .catch((error) => {
                reject(DAOError("unable to delete meetlink", 503, error));
              });
          });
    },

    getAllMeetLinks(classroomId){
        return new Promise((resolve, reject) => {
            Classroom.getMeetLinkDetailsByClassromId(classroomId)
              .then(async (classroomsDetails) => {
                
                resolve(classroomsDetails);
              })
              .catch((error) => {
                reject(DAOError("unable to update assignment", 503, error));
              });
          });
    },

    getMeetLinkById(){
    }
}