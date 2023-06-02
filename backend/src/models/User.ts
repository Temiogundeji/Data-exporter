const mongoose = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide firstName"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide lastName"],
    },
    email: {
      type: String,
      unique: true,
      validate: [isEmail, "Please add a valid email address"],
      sparse: true,
      lowercase: true,
      trim: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: [true, "Please include organization ID"],
    },
    password: {
      type: String,
    },
    tempToken: Object,

    isActive: {
      type: Boolean,
      required: [true],
      default: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

export default mongoose.model("User", UserSchema);
