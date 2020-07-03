const express = require('express') //import express
const app = express() //initialised express

//import deets module
const deetsUrls = require('./api/deets')

//import dotenv
const dotenv = require('dotenv')
dotenv.config() //activate dotenv

//import mongoose
const Mongoose = require("mongoose") 
Mongoose.connect(process.env.DB_ACCESS, console.log('DATABASE IS CONNECTED'))

app.use(express.json()) //body parser
app.use('/api/deets', deetsUrls)

app.listen(3300, () => console.log("I think server is running....blah blah blah"))