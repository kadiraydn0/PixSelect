import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        userAgent: { type: String },
        is_profile_deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

//oturum açmak için gereken ortamı modeller.
const Session = mongoose.model("Session", SessionSchema);

export default Session;
