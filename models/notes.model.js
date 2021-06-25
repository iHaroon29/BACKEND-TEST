const mongoose = require("../db/mongoDB");
const { Schema } = require("../db/mongoDB");

const NotesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    teacher_id: {
      type: mongoose.ObjectId,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("notes", NotesSchema);
