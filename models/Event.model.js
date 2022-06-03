const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  imageUrl: {
    type: String,
  },
  Author: { type: Schema.Types.ObjectId, ref: "User" },
  description: {
    type: String,
  },
  join: [{ type: Schema.Types.ObjectId, ref: "User" }],
  title: { type: String },
});

const Event = model("Event", eventSchema);

module.exports = Event;
