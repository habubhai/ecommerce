const mongoose = require('mongoose');


function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database connected.......")
    })
    .catch(()=>{
        console.log("Database not connected.")
    })
}

module.exports = connectDB;