const MeetlinkService = require("../services/meetlinks.service");

module.exports = {
  async addNewMeetLink(req, res) {
    try {
        const newMeetLink = await MeetlinkService.addNewMeetLink(req.body)
        return res.status(203).send(newMeetLink)
    } catch (error) {
        return res.status(error.statusCode || 503).send(error.message || "service unavailable")
    }
  },

  async updateMeetLinkById(req, res) {
    try {
        const updateMeetLink = await MeetlinkService.updateMeetLinkById(req.params.meetLinkId,req.body)
        return res.status(202).send(updateMeetLink)
    } catch (error) {
        return res.status(error.statusCode || 503).send(error.message || "service unavailable")
    }
  },

  async deleteMeetLinkById(req, res) {
    try {
        const deleteMeetLink = await MeetlinkService.deleteMeetLinkById(req.params.meetLinkId)
        return res.status(202).send(deleteMeetLink)
    } catch (error) {
        return res.status(error.statusCode || 503).send(error.message || "service unavailable")
    }
  },
  async getAllMeetLinks(req, res) {
    try {
        const allMeetLink = await MeetlinkService.getAllMeetLinks()
        return res.status(202).send(allMeetLink)
    } catch (error) {
        return res.status(error.statusCode || 503).send(error.message || "service unavailable")
    }
  },

  async getMeetLinkByID(req, res) {
    try {
        const meetLinkDetails = await MeetlinkService.getMeetLinkByID(req.params.meetLinkId)
        return res.status(202).send(meetLinkDetails)
    } catch (error) {
        return res.status(error.statusCode || 503).send(error.message || "service unavailable")
    }
  },
};
