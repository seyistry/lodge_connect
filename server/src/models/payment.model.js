import { Schema, model } from "mongoose";

const PaymentSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		apartment: {
			type: Schema.Types.ObjectId,
			ref: "Apartment",
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "completed", "cancelled"],
			default: "pending",
		},
	},
	{ timestamps: true }
);

const Payment = model("Payment", PaymentSchema);

export default Payment;
