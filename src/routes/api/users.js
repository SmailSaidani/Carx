const express = require("express");
const User = require("../../models/User")
const router = express.Router();
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { check, validationResult } = require("express-validator");
// @testing
//
const jwt = require ("jsonwebtoken")
router.post(
  "/",
  [check("name", "Name is required").not().isEmpty(),
  check('email','Please input valid email').isEmail(),
  check('password','Min 6 char in passwords ').isLength({min :6})

],
 async (req, res) => {


    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name , email , password }=req.body
    try {
        let user= await User.findOne({email})

        if(user){
            console.log("existing user ")
             return res.status(400).json({errors: [{msg :" existing user"}]})
        }
        const avatar = gravatar.url(email , {
            s:'200',
            r:'pg',
            d:'mm'
        })



        user = new User({
            name,
            email,
            avatar,
            password
        })
        //password encryption 

        const salt = await bcrypt.genSalt(10);

         user.password = await bcrypt.hash(password , salt);

        await user.save();


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

module.exports = router;
