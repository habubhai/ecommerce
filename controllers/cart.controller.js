const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Cart} = require('../model/Cart')
const {User} = require('../model/User')
const {Product} = require('../model/Product')
const sendEmail = require('../utils/userEmail')



const cart = async(req,res)=>{
    try{
        const {token} = req.headers;
        const decodedToken = jwt.verify(token,'supersecret')
        const user = await User.findOne({email : decodedToken.email}).populate({
            path:'cart',
            populate:{
                path:'products.product',
                model: 'Product'
            }
        })
        if(!user)
        {
            res.status(404).json({
                message:"User not found"
            })
        }
        res.status(200).json({
            message:`Cart items retrieved successfully-${user.cart.products.length()}`,
            cart:user.cart
        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const addToCart = async(req,res)=>{
    try{
       const{productId,quantity} = req.body;

       if(!productId || !quantity)
       {
            return res.status(400).json({
                message:"some fields are missing"
            })
       }
       const{token} = req.headers;
       let decodedToken = jwt.verify(token,"supersecret")
       let user = await User.findOne({email:decodedToken.email})
       if(user)
       {
        const product = await Product.findById(productId)
        const cart = await Cart.findOne({_id:user.cart_id})
       
        if(cart)
            {
                const exists = cart.products.some((p)=>{p.product.toString() === productItem.toString() })
            
                if(exists)
                {
                    return res.status(409).json({
                        message:"Go to cart"
                    })
                
                }
    
            cart.products.push({product:productID,quantity})
            cart.total += product.price * quantity;
    
            await cart.save();
            
            }
            else{
                const newCart = await Cart.create({
                    products:[
                        {
                            product:productId,
                            quantity:quantity
                        }
                    ],
                    total:product.price * quantity
                })
                user.cart = newCart._id
                await user.save();
            }
            return res.status(200).json({
                message:"product added to cart.."
            })
       }
       else{
            return res.status(401).json({
                message:"Invalid Credentials"
            })
       }
    
    }
    
    catch(error){
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const updateCart=async(req,res)=>{
   try{
    const{productId,action}=req.body
    const {token} = req.headers
    const decodedToken = jwt.verify(token,'supersecret')
    const user = await User.findOne({email:decodedToken.email}).populate({
        path:'cart',
        populate:{
            path:'products.product',
            model:'Product'
        }
    })
    if(!user || !user.cart)
    {
        return res.status(400).json({
            message:'cart not found'
        })
    }
    const cart = user.cart;
    const item = cart.products.find((p)=>p.product._id.toString() === productId)
    if(!item)
    {
        return res.status(400).json({
            message:"product note found"
        })
    }

    const itemPrice = item.product.price;

    //action logic
    if(action === "increase")
    {
        item.quantity +=1;
        cart.total+=totalPrice;
    }
    else if( action === 'decrease')
    {
        if(item.quantity > 1 )
        {
            item.quantity -= 1;
            cart.total -= totalPrice;
        }
        else{
            cart.total -= totalPrice
            cart.products = cart.products.filter((p)=> p.product._id.toString() !== productId )
        }
    }
    else if(action === "remove"){
        cart.total -= totalPrice * item.quantity;
        cart.products = cart.products.filter((p)=> p.product._id.toString() !== productId )
    }
    else{
        res.status(400).json({message:"Invaid Action"})
    }
    await cart.save();
    return res.status(200).json({
        message:"cart updated",
        cart
    })
   }
   catch(error){
        console.log(error)
        res.status(400).json({
            message: "Internal Server Error"
        })
    }
}

module.exports={cart,addToCart}