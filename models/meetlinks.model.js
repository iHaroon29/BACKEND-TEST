const mongoose = require("../db/mongoDB");

const MeetLink = new mongoose.Schema(
  {
      "link":{
          type:String,
          required:true,
          unique:true
      }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("meet_link", MeetLink);
