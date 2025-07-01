const nodeEmailer = require('nodemailer')

const sendEmail =async(userEmail,productArray)=>{
    const tranporter = nodeEmailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.NODE_EMAIL,
            pass:process.env.NODE_PASS
        }
    })

    //prepare product details in text format
    const productDetails = productArray.map((product,item)=>{
        `${index + 1}.Name:${product.Name}.Price:${product.price}`
    })

    //setup mail content
    const mailOptions = {
        from:process.env.NODE_EMAIL,
        to:userEmail,
        subjec:"Your order details",
        text:`Thanks for your purchase \n\n here is your product details `
    }
    try{
        await tranporter.sendMail(mailOptions)
    }
    catch(e)
    {
        console.log(e)
    }
}

module.exports = sendEmail;