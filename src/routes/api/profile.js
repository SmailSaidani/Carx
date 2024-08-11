const express = require('express')

const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
// @testing 
//
const {check , validationResult}=require('express-validator')
router.get('/me',auth,async(req, res) => {

    try {
      const profile = await Profile.findOne({user : req.user.id}).populate('user',['name','avatar']);

      if(!profile){
        return res.status(400).json({msg : "no profile for this user"})


      }

      res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }

})


//post to create or update user profile 
router.put('/rent/:id',auth, async (req, res)=>{
  try {
    
      const user = await User.findById(req.body.user)
      console.log(user)
      user.RentedCars.push(req.body.ID)
      await user.save()
      res.json(user)
  } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
      
  }
})






router.put('/like/:id',auth, async (req, res)=>{
  try {
    
      const user = await User.findById(req.body.user)
      user.likedCars.push(req.body.ID)
      await user.save()
      res.json(user)
  } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
      
  }
})




router.put('/unlike/:id',auth, async (req, res)=>{
  try {
    
      const user = await User.findById(req.body.user)
      console.log(user)
      const removeIndex =user.likedCars.map(like => like.user).indexOf(req.body.ID)

      await user.save()
      res.json(user)
  } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
      
  }
})



router.put('/unrent/:id',auth, async (req, res)=>{
  try {
    
      const user = await User.findById(req.body.user)
      console.log(user)
      const removeIndex =user.RentedCars.map(rent => rent.user).indexOf(req.body.ID)

      await user.save()
      res.json(user)
  } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
      
  }
})


router.post('/',auth,async(req,res)=>{
    
const{
    likedcars,
    takencars
}=req.body;

const profileFields={}

profileFields.user= req.user.id;
if(likedcars) {profileFields.likedcars=likedcars.split(',').map(car => car.trim())};
if(takencars) {profileFields.takencars=takencars.split(',').map(car => car.trim())};

console.log(profileFields.likedcars)
console.log(profileFields.takencars)


try {
    let profile = await Profile.findOne({user : req.user.id})

    if(profile){
        //updating 
        profile=await Profil.findOneAndUpdate({ user: req.user.id },
            {$set: profileFields },
            {new:true}
            )


            return res.json(profile)

    }

    //create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile)
} catch (error) {
    console.error(error.message)
    res.status(500).send('server error')
}

})


router.get('/all', async (req, res) => {
  try {
    const profiles = await Profile.find()
    .populate('user', ['name', 'avatar'])
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
    
  }

      })




module.exports = router