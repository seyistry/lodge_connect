import { Schema, model } from "mongoose";

const favoriteSchema = new Schema(
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
	},
	{ timestamps: true }
);

const Favorite = model("Favorite", favoriteSchema);

export default Favorite;
