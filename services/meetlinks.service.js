const MeetLinkDAO = require("../dao/meetLinks.dao");
const MeetLinkValidator = require("../validators/meetLinks.validators");
const ActivityLogger=require("../loggers/activity.logger");
const LOG_FOR_MEET_LINK=require("../config/LOGGERS_FOR").meet_links;
const ServiceErrorMessage=require("../errors/serviceErrorMessage").getRejectResponse;

module.exports = {
  async addNewMeetLink(newMeetLinkData,userDetails={}) {
    try{
      const validMeetLink=await MeetLinkValidator.newMeetLink(newMeetLinkData);
      const newMeetLink=await MeetLinkDAO.addNewMeetLink(validMeetLink);
      await ActivityLogger.logActivityCreatedNew(newMeetLink,LOG_FOR_MEET_LINK,userDetails);
      return newMeetLink;
    }catch (e) {
      throw ServiceErrorMessage("unable to create new meet links",503,e);
    }
  },
  async updateMeetLinkById(meetLinkID, updateLinkData,userDetails={}) {
    try{
      const validMeetLink=await MeetLinkValidator.updateMeetLink(updateLinkData);
      const oldMeetLink=await MeetLinkDAO.getMeetLinkById(meetLinkID);
      const newMeetLink=await MeetLinkDAO.addNewMeetLink(validMeetLink);
      await ActivityLogger.logActivityUpdated(oldMeetLink,newMeetLink,LOG_FOR_MEET_LINK,userDetails)
      return newMeetLink;
    }catch (e) {
      throw ServiceErrorMessage("unable to update meet links",503,e);
    }
  },
  async deleteMeetLinkById(meetLinkID,userDetails={}) {
    try{
      const newMeetLink=await MeetLinkDAO.deleteMeetLinkById(meetLinkID);
      await ActivityLogger.logActivityDeleted(newMeetLink,LOG_FOR_MEET_LINK,userDetails);
      return newMeetLink;
    }catch (e) {
      throw ServiceErrorMessage("unable to delete meet links",503,e);
    }
  },

  async getAllMeetLinks() {
    try{
      return await MeetLinkDAO.getAllMeetLinks();
    }catch (e) {
      throw ServiceErrorMessage("unable to get all meet links",503,e);
    }
  },

  async getMeetLinkByID(meetID) {
    try{
      return await MeetLinkDAO.getMeetLinkById(meetID);
    }catch (e) {
      throw ServiceErrorMessage("unable to get meet link",503,e);
    }
  },
};
