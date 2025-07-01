const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { cart,addToCart } = require('../controllers/cart.controller');

//route to get cart
router.get('/userCart',cart);
router.post('/addtoCart/:id',addToCart);

module.exports = router