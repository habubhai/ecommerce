const express = require('express');
const app = express();
const port = 8080;
const connectDB = require('./DB/connectDB')

//db
connectDB();

const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/index')


app.use(cors());
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//routes
app.use(routes)

app.listen(port,(req,res)=>{ 
    console.log('Server Connected....');
})
