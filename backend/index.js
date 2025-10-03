const express = require("express")
const cors = require("cors")
require("dotenv").config()
const productRouter = require("./routes/productRoutes")
const orderRouter = require("./routes/orderRoutes")

const app = express()
const PORT = 4000

app.use(express.json())
app.use(cors({ origin: process.env.frontendURL || "http://localhost:5173/" }));

app.use('/products', productRouter)
app.use('/order', orderRouter)

app.get('/status', (req,res)=>{
    res.send({status:"ok"})
})

app.listen(PORT, ()=>{
    console.log("Server is running on http://localhost:"+PORT);
})