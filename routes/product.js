const express = require('express');
const { product, addProduct, singleProdcut, updateProduct, deleteProduct } = require('../controllers/product.controller');
const router = express.Router();

//task one see all products

router.get('/products',product)
//task 2 add product

router.post('/add-product',addProduct)

//task3 ->see single product
router.get('/single-product/:id',singleProdcut)

//task4 -> update product
router.put('/edit/:id',updateProduct)

//task5 -> delete product
router.delete('/delete/:id',deleteProduct)

module.exports = router;