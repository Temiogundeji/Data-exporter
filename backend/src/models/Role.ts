const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter role name"],
        },
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

export default mongoose.model("Role", RoleSchema);
