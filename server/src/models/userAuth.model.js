import { Schema, model } from "mongoose";

const userAuthSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
	otp: { type: String },
	expiredAt: { type: Date },
	status: { type: String, enum: ["pending", "validated"], default: "pending" },
	token: { type: String },
}, { timestamps: true });

const UserAuth = model("UserAuth", userAuthSchema);

export default UserAuth;
