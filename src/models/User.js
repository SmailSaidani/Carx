const mongoose = require ('mongoose')


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        avatar:{
            type:String
        },
        date:{
            type:Date,
            default:Date.now
        },
        likedCars:[{
            car:{
                type:mongoose.Schema.ObjectId,
                ref:'car'
            }
        }],
        RentedCars:[{
            car:{
                type:mongoose.Schema.ObjectId,
                ref:'car'
            }
        }]
    
}) 


module.exports = User = mongoose.model('users',UserSchema)