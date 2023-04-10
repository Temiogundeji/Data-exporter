const mongoose = require("mongoose");
const { isEmail } = require("validator");

const DatabaseSchema = new mongoose.Schema(
  {
    connection_string: {
      type: String,
      required: [true, "Please username last name"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

module.exports = mongoose.model("Database", DatabaseSchema);
