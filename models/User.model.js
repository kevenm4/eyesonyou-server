const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      // unique: true -> Ideally, should be unique, but its up to you
    },

    imageUrl: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    types: {
      type: String,
      enum: ["Player", "Scouter"],
    },
    Posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    Events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    sport: {
      type: String,
    },
    team: {
      type: String,
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
