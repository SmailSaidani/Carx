const express = require('express')

const router = express.Router()
const auth = require("../../middleware/auth")
const User=require('../../models/User')
const { check, validationResult } = require("express-validator");
const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")
// @testing 
//
router.get('/',auth, async(req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')
      res.json(user);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("error")
        
    }
})












router.post(
    "/",
    [
    check('email','Please input valid email').isEmail(),
    check('password','required password ').exists()
  
  ],
   async (req, res) => {
  
  
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({errors: errors.array()});
      }
      const { email , password }=req.body
      try {
          console.log(email)
          let user= await User.findOne({email})
  
          if(!user){
               return res.status(400).json({errors: [{msg :" invalid credentials"}]})
          }

  
          const isSame = await bcrypt.compare(password, user.password)
  
          if(!isSame){
            return res.status(400).json({errors: [{msg :" invalid credentials"}]})

          }



  
  
          const payload = {
               user : { 
                  id : user.id 
               }
  
  
          }
  
          jwt.sign(payload,
               "samael98",
               {
                  expiresIn: 360000
               },
               (err,token)=>{
                  if(err) throw err;
                  res.json({token}) 
               })
  
  
  
  
  
      } catch (error) {
          console.error(error.message);
          res.status(500).send("server error")
      }
  
  
      
    }
  );

module.exports = router