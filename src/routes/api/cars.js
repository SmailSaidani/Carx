const express = require('express')

const router = express.Router()
const {check , validationResult}=require('express-validator')
const auth = require('../../middleware/auth')
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Car = require('../../models/Car')
// @testing 
//
router.post('/',auth, async(req,res)=>{




    try {
        const user = await User.findById(req.user.id).select('-password')

        const newCar =new Car ({
            brand:req.body.Brand,
            model:req.body.Model,
            Serial:req.body.Snb,
            Doors:req.body.Doors,
            FuelType:req.body.FuelT ,
            Engin:req.body.Engine,
            Year:req.body.Year,
            Transmission:req.body.Trans,
            Price:req.body.Price,
            Body:req.body.Body,
            Seats:req.body.Seats,
            ABS:req.body.ABS,
            ESP:req.body.ESP,
            AIDE:req.body.AIDE,
            ImgM:req.body.imagePC,
            ImgS1:req.body.imagePC1,
            ImgS2:req.body.imagePC2,

        
    
        })

        const car = await newCar.save();
        res.json(car)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
        
    }
   




})

router.get('/',async(req,res)=>{
    try {


        const AllCars= await Car.find().sort({date : -1})
        res.json(AllCars)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
        
    }
})




router.get('/:id',async(req,res)=>{
    try {


        const ACar= await Car.findById(req.params.id)
        if(!ACar){
           return res.status(404).json({msg : "No car found "})
        }
        res.json(ACar)
        
    } catch (error) {
        if(error.kind === 'objectId'){
            return res.status(404).json({msg : "No car found "})

        }
        console.error(error.message)
        res.status(500).send('Server Error')
        
    }
})

router.put('/rent/:id',auth, async (req, res)=>{
    try {
        const car = await Car.findById(req.params.id)
        car.taken = true
        car.takenBy = req.user.id
        await car.save()
        res.json(car)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
        
    }
})




router.put('/like/:id',auth, async (req, res)=>{
    try {
        const car = await Car.findById(req.params.id)
        car.likes.push(req.body.user)
        await car.save()
        res.json(car)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
        
    }
})





router.put('/unlike/:id',auth, async (req, res)=>{
    try {
        const car = await Car.findById(req.body.ID)
        console.log(car)
        const removeIndex =car.likes.map(like => like.user).indexOf(req.body.user)
        car.likes.splice(removeIndex,1)
        await car.save()
        res.json(car)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
        
    }
})


router.put('/unrent/:id',auth, async (req, res)=>{
    try {
        const car = await Car.findById(req.body.ID)
        console.log(car)
        car.takenBy=null
        car.taken=false
        await car.save()
        res.json(car)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
        
    }
})




router.put('/changep', async (req, res)=>{
    try {
        const car = await Car.findOne({Serial:req.body.serial})
        car.Price = req.body.price
        await car.save()
        res.json(car)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
        
    }
})


router.put('/unrent/:id',auth, async (req, res)=>{
    try {
        const car = await Car.findById(req.params.id)
        car.taken = false
        car.takenBy = null
        await car.save()
        res.json(car)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
        
    }
})
module.exports = router