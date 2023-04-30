const mongoose = require("mongoose");

const DatabaseSchema = new mongoose.Schema(
  {
    connString: {
      type: String,
      required: [true, "Please username last name"],
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: [true, "Please include organization ID"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

module.exports = mongoose.model("Database", DatabaseSchema);
