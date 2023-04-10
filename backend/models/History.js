const mongoose = require("mongoose");
const { isEmail } = require("validator");

const HistorySchema = new mongoose.Schema(
  {
    event: {
      type: String,
      enum: ["male", "female"],
    },
    event_date: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide an authors"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

module.exports = mongoose.model("History", HistorySchema);
