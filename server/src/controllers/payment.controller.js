import stripe from "stripe";
import Payment from "../models/payment.model.js";
import tryCatch from "../utils/helpers/tryCatch.helper.js";

// Set up the Stripe API with your Stripe API key
const stripeAPI = new stripe(process.env.STRIPE_PRIVATE_KEY);

// API endpoint for handling payment processing
export const processPayment = tryCatch(async (req, res) => {
	const { userId } = req;
	const { apartmentId } = req.params;
	const { amount, paymentMethod } = req.body;

	// Create a Stripe PaymentIntent to process the payment
	const paymentIntent = await stripeAPI.paymentIntents.create({
		amount: amount * 100,
		currency: "usd",
		payment_method: paymentMethod,
		confirm: true,
	});

	// Create a new payment record in your database
	const payment = new Payment({
		user: userId,
		apartment: apartmentId,
		amount,
		paymentMethod,
		status: "completed",
	});
	await payment.save();

	// Send the client secret to the frontend to complete the payment
	res.json({ clientSecret: paymentIntent.client_secret });
});
