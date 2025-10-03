const express = require("express")
const cors = require("cors")
require("dotenv").config()
const productRouter = require("./routes/productRoutes")
const orderRouter = require("./routes/orderRoutes")

const app = express()
const PORT = 4000

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS for our frontend url which is accessed through .env
app.use(cors({ origin: process.env.frontendURL || "http://localhost:5173/" }));

// Mount routers for base routes
app.use('/products', productRouter)
app.use('/order', orderRouter)

// Simple health check endpoint
app.get('/status', (req, res) => {
    res.send({ status: "ok" });
})

// Start the server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
})