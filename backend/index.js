const express = require("express")
const cors = require("cors")
const productRouter = require("./routes/productRoutes")

const app = express()
const PORT = 4000

app.use(express.json())
app.use(cors())

app.use('/products', productRouter)

app.get('/status', (req,res)=>{
    res.send({status:"ok"})
})

app.listen(PORT, ()=>{
    console.log("Server is running on http://localhost:"+PORT);
})