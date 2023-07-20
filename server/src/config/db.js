import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const { DB_URI } = process.env;

export const connectDB = async () => {
	try {
		await mongoose.connect(DB_URI);
		console.log("Connection to Database has been established");
	} catch (error) {
		console.log("Error connecting to Database: " + error.message);
	}
};
