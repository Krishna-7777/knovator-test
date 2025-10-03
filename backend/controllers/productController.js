const InMemoryProducts = require('./../products')

const GET = (req, res) => {
    let { limit, offset } = req.query;

    limit = parseInt(limit) || InMemoryProducts.length;
    offset = parseInt(offset) || 0;

    res.json(InMemoryProducts.slice(offset, offset + limit))
}

module.exports = { GET }