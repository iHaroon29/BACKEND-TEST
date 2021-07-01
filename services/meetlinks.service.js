const MeetLink = require("../models/meetlinks.model");
const MeetLinkValidator = require("../utils/meetLinks.validators");

module.exports = {
  addNewMeetLink(newMeetLinkData) {
    return new Promise((resolve, reject) => {
      MeetLinkValidator.newMeetLink(newMeetLinkData)
        .then((validData) => {
          new MeetLink(validData)
            .save()
            .then((savedMeetLink) => {
              resolve(savedMeetLink);
            })
            .catch((error) => {
              reject({
                message: "unable to create meet link",
                trace: error,
                statusCode: 503,
              });
            });
        })
        .catch((error) => {
          reject({
            message: "invalid data " + error,
            trace: error,
            statusCode: 400,
          });
        });
    });
  },
  updateMeetLinkById(meetLinkID, updateLinkData) {
    return new Promise((resolve, reject) => {
      MeetLinkValidator.updateMeetLink(updateLinkData)
        .then((validData) => {
          MeetLink.findByIdAndUpdate(meetLinkID, validData, { new: true })
            .then((savedMeetLink) => {
              resolve(savedMeetLink);
            })
            .catch((error) => {
              reject({
                message: "unable to update meet link",
                trace: error,
                statusCode: 503,
              });
            });
        })
        .catch((error) => {
          reject({
            message: "invalid data " + error,
            trace: error,
            statusCode: 400,
          });
        });
    });
  },
  deleteMeetLinkById(meetLinkID) {
    return new Promise((resolve, reject) => {
      MeetLink.findByIdAndDelete(meetLinkID)
        .then((deletedLink) => {
          resolve(deletedLink);
        })
        .catch((error) => {
          reject({
            message: "unable to delete" + error,
            trace: error,
            statusCode: 503,
          });
        });
    });
  },

  getAllMeetLinks() {
    return new Promise((resolve, reject) => {
      MeetLink.find()
        .then((allMeetLinks) => {
          resolve(allMeetLinks);
        })
        .catch((error) => {
          reject({
            message: "unable to find" + error,
            trace: error,
            statusCode: 503,
          });
        });
    });
  },

  getMeetLinkByID(meetID) {
    return new Promise((resolve, reject) => {
      MeetLink.findById(meetID)
        .then((meetLink) => {
          if (!meetLink) {
            reject({
              message: "no meet link found",
              trace: "no trace found",
              statusCode: 503,
            });
          }
          resolve(meetLink);
        })
        .catch((error) => {
          reject({
            message: "unable to find" + error,
            trace: error,
            statusCode: 503,
          });
        });
    });
  },
};
