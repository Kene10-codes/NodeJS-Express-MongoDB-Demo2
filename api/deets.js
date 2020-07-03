const express = require('express') //imported express
const router = express.Router()
const OurDeets = require('../models/deetsModel')

const {signupChecks} = require("../deetValidation") //imported a function
const deetsModel = require('../models/deetsModel')

const bcrypt = require("bcryptjs"); //imported bcryptjs



router.post('/signup', async (request, response) => {
    const {error} = signupChecks(request.body)    //check if they is error in the form
    if(error){
        return response.status(400).send(error.details[0].message) //if there is error return this line
    }
    const existingEmail = await deetsModel.findOne({email:request.body.email})
    if(existingEmail){
        return response.status(400).send("Email already exists")
    }
    
    const saltPassword = await bcrypt.genSalt(10) //
    const hashedPassword = await bcrypt.hash(request.body.password, saltPassword) //hashed the user's input password

    const assignedDeets = new OurDeets({
         username:request.body.username,
         email:request.body.email,
         password:hashedPassword
    })
    assignedDeets.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
    
})

module.exports = router