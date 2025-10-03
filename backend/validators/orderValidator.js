const Joi = require("joi");

const orderSchema = Joi.object({
  firstName: Joi.string().trim().min(2).required().messages({
    "string.base": "First name must be text",
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters long",
    "any.required": "First name is required"
  }),
  lastName: Joi.string().trim().min(2).required().messages({
    "string.base": "Last name must be text",
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters long",
    "any.required": "Last name is required"
  }),
  address: Joi.string().trim().min(5).required().messages({
    "string.base": "Address must be text",
    "string.empty": "Address is required",
    "string.min": "Address must be at least 5 characters long",
    "any.required": "Address is required"
  }),
  items: Joi.array().items(
    Joi.object({
      id: Joi.number().required().messages({
        "any.required": "Product ID is required"
      }),
      name: Joi.string().required(),
      price: Joi.number().positive().required(),
      quantity: Joi.number().integer().min(1).required().messages({
        "number.base": "Quantity must be a number",
        "number.min": "Quantity must be at least 1",
        "any.required": "Quantity is required"
      })
    }).unknown(true)
  ).min(1).required().messages({
    "array.base": "Items must be an array",
    "array.min": "At least one item is required",
    "any.required": "Cart items are required"
  })
});

module.exports = orderSchema;
