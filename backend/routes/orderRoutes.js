const {Router} = require('express')
const orderController = require('./../controllers/orderController')

const orderRouter = Router()

orderRouter.post('/', orderController.POST)

module.exports = orderRouter