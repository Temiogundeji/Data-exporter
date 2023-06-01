import mongoose from "mongoose";
import { base64Encode } from "../utils/helpers";

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
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true },
);

CredentialsSchema.pre("save", function (next) {
  const credential = this;
  if (!credential) {
    const error = new Error("credential not provided");
    next(error);
  }
  credential.username = base64Encode(String(credential.username));
  credential.password = base64Encode(String(credential.password));
  credential.clusterName = base64Encode(String(this.clusterName));
})

export default mongoose.model("Credential", CredentialsSchema);
