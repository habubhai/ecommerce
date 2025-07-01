const express = require('express');
const router = express.Router();
const userRouter = require('./user')
const productRoute = require('./product')
const cart = require('./cart')


router.use('/user',userRouter)
router.use('/userProduct',productRoute)
router.use('/singleProdcut',productRoute)
router.use('/cart',cart)
module.exports = router