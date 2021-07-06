const MeetlinkController = require("../controllers/meetLinks.controller")
const route = require("express").Router()

route.post("/meet_link/new", MeetlinkController.addNewMeetLink);

route.put("/meet_link/update/:meetLinkId", MeetlinkController.updateMeetLinkById);

route.delete("/meet_link/delete/:meetLinkId", MeetlinkController.deleteMeetLinkById);

route.get("/meet_links/all/", MeetlinkController.getAllMeetLinks);

route.get("/meet_link/details/:meetLinkId", MeetlinkController.getMeetLinkByID);

module.exports = route
