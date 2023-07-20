import { Schema, model } from "mongoose";

const userAuthSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
	otp: { type: String },
	expiredAt: { type: Date },
	status: { type: String, enum: ["pending", "validated", "expired"], default: "pending" },
}, { timestamps: true });

const UserAuth = model("UserAuth", userAuthSchema);

export default UserAuth;
