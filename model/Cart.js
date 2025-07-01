const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    prodcuts:[
    {
        product:
         {
            type:mongoose.Schema.ObjectId,
            refs:"Product"
        },
        quantity:{
            type:Number,
            default:1
        }
    }
    ],
    total:{
        type:Number
    }
})

const Cart = mongoose.model("Cart",cartSchema)
module.exports= {Cart}