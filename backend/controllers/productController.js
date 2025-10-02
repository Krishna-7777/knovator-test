const InMemoryProducts = require('./../products')

const GET = (req,res)=>{
    res.json(InMemoryProducts)
}

module.exports = {GET}