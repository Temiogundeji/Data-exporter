const mongoose = require("mongoose");
const { isEmail } = require("validator");

const OrganizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please username last name"],
    },
    about: {
      type: String,
      unique: true,
      validate: [isEmail, "Please add a valid email address"],
      sparse: true,
      lowercase: true,
      trim: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please include admin"],
    },
    password: {
      type: String,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

module.exports = mongoose.model("Organization", OrganizationSchema);
