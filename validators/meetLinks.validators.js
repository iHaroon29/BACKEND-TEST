const Joi = require("joi")

module.exports = {
    newMeetLink(meetLinkData){
        return Joi.object({
            "link":Joi.string().required()

        }).options({stripUnknown:true}).validateAsync(meetLinkData);
    },

    updateMeetLink(updateLink){
        return Joi.object({
            "link":Joi.string().optional()

        }).options({stripUnknown:true}).validateAsync(updateLink);
    }
}