const orderSchema = require("../validators/orderValidator");

const POST = (req, res) => {
    // Validate Place Order Reuest with schema 
    const { error, value } = orderSchema.validate(req.body, { abortEarly: false });

    if (error) {
        // send validaton errors
        const messages = error.details.map(d => d.message);
        return res.status(400).json({ errors: messages });
    }

    // Create Dummy order
    const order = {
        id: Date.now(),
        ...value,
        createdAt: new Date().toISOString()
    };

    console.log("Order Placed");
    console.log(JSON.stringify(order, null, 2));

    res.json({ message: "Order placed successfully", orderId: order.id })
}

module.exports = { POST }