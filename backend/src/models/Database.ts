import mongoose from "mongoose";

const CredentialsSchema = new mongoose.Schema(
  {
    connString: {
      type: String,
      required: [true, "Please password"],
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: [true, "Please include organization ID"],
    },

  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

export default mongoose.model("Database", CredentialsSchema);
