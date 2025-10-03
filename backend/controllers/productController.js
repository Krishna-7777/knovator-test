const InMemoryProducts = require('./../products')

const GET = (req, res) => {
    let { limit, offset } = req.query;
    // limit and offset 
    // updating their value with default if not present in the query
    limit = parseInt(limit) || InMemoryProducts.length;
    offset = parseInt(offset) || 0;

    // using .slice() to apply limit and offset
    res.json(InMemoryProducts.slice(offset, offset + limit))
}

module.exports = { GET }