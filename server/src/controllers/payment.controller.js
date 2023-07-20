import stripe from "stripe";
import tryCatch from '../utils/helpers/tryCatch.helper.js';

const stripeAPI = new stripe(process.env.STRIPE_SECRET_KEY);

const processPayment = tryCatch(async(req, res) => {
	
})