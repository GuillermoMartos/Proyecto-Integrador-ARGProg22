require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {PORT} = process.env;
const morgan = require("morgan");

const app=express();


//express settings
app.set('port', 3001)

//Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json())

//routes
app.use(require('./routes'))


app.listen(app.get('port'),()=>{
  console.log("express running in port "+app.get('port'))
})

