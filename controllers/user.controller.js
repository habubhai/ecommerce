const {User} = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

const signup = async (req,res)=>{
    try{
        let{name,email,password} = req.body

        if(!name || !email || !password){
            res.status(400).json({
                message:"Some field are missing"
            })
        }

        const isUserAlreadyExist = await User.findOne({email})

        if(isUserAlreadyExist)
        {
            return res.status(400).json({
                message : "User alreay exist"
            })
        }

        //hash the password
        const salt = bcrypt.genSaltSync(10);
        const passwordHashed = bcrypt.hashSync(password,salt)

        //jwt token
        const token = jwt.sign({email},"supersecret",{expiresIn : '365d'})
        console.log(token)
        
        //create user in database
        await User.create({
            name,
            email,
            password : passwordHashed,
            token,
            role :'user'
        })

        res.status(200).json({
            message: "User created Successfully...."
        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

const login = async(req,res) =>{
    try{
        let{email,password} = req.body

        if(!email || !password){
            res.status(400).json({
                message:"Some field are missing"
            })
        }

        const user = await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({
                message : "User not registered.."
            })
        }
        const isPasswordMatched = bcrypt.compareSync(password,user.password)
        if(!isPasswordMatched)
        {
            return res.status(400).json({
                message: "Password is wrong"
            })
        }

        res.status(200).json({
            message:"User login successfully...",
            id:user._id,
            name: user.name,
            token: user.token,
            password: user.password,
            email: user.email,
            role: user.role
        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message:"Internal server error"
        })
    }
}




module.exports = {signup,login}