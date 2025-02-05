import orderModel from "../models/orderModels.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Not Authorized, login again" });
    }

    const frontend_url = "http://localhost:5173";
    
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} }, { new: true });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: { name: item.name },
                unit_amount: Number(item.price) * 100, // Xatoni oldini olish uchun Number() ishlatildi
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "usd", // "inr" emas!
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100, // 2 USD bo‘lsa, 2 * 100 kifoya
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Error placing order", error: error.message });
    }
};

export { placeOrder };
