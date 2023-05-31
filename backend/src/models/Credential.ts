import mongoose from "mongoose";

const CredentialsSchema = new mongoose.Schema(
  {
    dbType: {
      type: String,
      required: [true, "Please include your DB type"],
      enum: ["nosql", "sql"]
    },
    dbName: {
      type: String,
      required: [true, "Please include dbName"],

    },
    username: {
      type: String,
      // required: [true, "Please include username"]
    },
    password: {
      type: String,
      // required: [true, "Please include password"]
    },
    isLocal: {
      type: Boolean,
      required: [true, "Please include isLocal"]
    },
    port: {
      type: String,
    },
    clusterName: {
      type: String,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: [true, "Please include organization ID"],
    },

  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

export default mongoose.model("Credential", CredentialsSchema);
