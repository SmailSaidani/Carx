const mongoose = require('mongoose')


const CarSchema = new mongoose.Schema({

    brand:{
        type: String,
        required:true
    },
    model:{
        type: String,
        required:true
    },
    Seats:{
        type: String,
        required:true
    },
    Doors:{
        type: String,
        required:true
    },
    FuelType:{
        type: String,
        required:true
    },
    Engin:{
        type: String,
        required:true
    },
    Year:{
        type: String,
        required:true
    },
    Transmission:{
        type: String,
        required:true
    },
    Price:{
        type: String,
        required:true
    },
    Serial:{
        type: String,
        required:true
    },
    ABS:{
        type:Boolean,
        required:true
    },
    ESP:{
        type: Boolean,
        required:true
    },
    AIDE:{
        type: Boolean,
        required:true
    },
    likes:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'users'
        }
    }],
    ImgM:{
            type:String,
        },
    ImgS1:{
            type:String,
        },
    ImgS2:{
            type:String,
        },
   
    taken :{
        type:Boolean,
        default:false
    },
    takenBy:{
        type:mongoose.Schema.ObjectId,
        ref:'users'
    }
})





module.exports = Car = mongoose.model('car',CarSchema)