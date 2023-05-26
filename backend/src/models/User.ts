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
      required: [true, "Please provide last last"],
    },
    email: {
      type: String,
      unique: true,
      validate: [isEmail, "Please add a valid email address"],
      sparse: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

export default mongoose.model("User", UserSchema);
