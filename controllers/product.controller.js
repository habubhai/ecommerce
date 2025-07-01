const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Product} = require('../model/Product');
const { User } = require('../model/User');
const { json } = require('express');

const product = async(req,res)=>{
    try{
        const products = await Product.find();
        return res.status(200).json({
            message: "All Products",
            products:products
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message:"Internal server error"
        })
    }
} 

const addProduct = async(req,res)=>{
    try{
        
        let{name,price,image,brand,stock,description} = req.body
        let {token} = req.headers;
        console.log(token)
        let decodedToken = jwt.verify(token,'supersecret')
        let user = await User.findOne({email:decodedToken.email})
        const product = await Product.create({
            name,
            price,
            image,
            description,
            stock,
            brand,    
            user: user._id
        }) 
        return res.status(200).json({
            message:"Product created...",
            product:product
        })

        // if(!name || !price || !image || !brand || !stock || !description)
        // {
        //     res.status(400).json({
        //         message:"Some fields are missing"
        //     })
        // }

    }
    catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
const singleProdcut = async(req,res)=>{
    try{
        let{id} = req.params
        if(!id){
            return res.status(400).json({
                message:"Id not found"
            })
        }
        let{token} = req.headers
        const decodedToken = jwt.verify(token,'supersecret')
        const user = await User.findOne({email:decodedToken.email})
        if(user){
            const product = await Product.findById(id)

            if(!product)
            {
                res.status(400).json({
                    message:"Product not found"
                })
            }
            return res.status(200).json({
                message:"Product found..",
                product:product
            })
        }

    }
    catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const updateProduct  = async(req,res)=>{
    try{
        let {id} = req.params
        let{token} = req.headers
        let decodedToken = jwt.verify(token,'supersecret')
        let user = await User.findOne({email:decodedToken.email})

        if(user)
        {
            const productupdated = await Product.findByIdAndUpdate(id,req.body)
            return res.status(200).json({
                message:"Product Updated....",
                product: productupdated
            })
        }

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const deleteProduct = async(req,res)=>{
    try{
        let{id} = req.params;
        let{token} = req.headers;
        let decodedToken = jwt.verify(token,'supersecret')
        let user = await User.findOne({email:decodedToken.email})
        if(user)
        {
            await Product.findByIdAndDelete(id);
            return res.status(200).json({
                message:"Prodct deleted...."
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
module.exports = {product,addProduct,singleProdcut,updateProduct,deleteProduct}