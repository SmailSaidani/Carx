
var mongoose = require('mongoose');



const connectDB =async()=>{
    try {

     await mongoose.connect("mongodb://smailsai98:wiryoppu@ac-1w9sdlg-shard-00-00.bbt8s9h.mongodb.net:27017,ac-1w9sdlg-shard-00-01.bbt8s9h.mongodb.net:27017,ac-1w9sdlg-shard-00-02.bbt8s9h.mongodb.net:27017/?ssl=true&replicaSet=atlas-71123n-shard-0&authSource=admin&retryWrites=true&w=majority",{
     })

     console.log("connected to mdb")

        
    } catch (error) {
        console.error(error.message)
        //exit with error
        process.exit(1)
        
    }
}



module.exports = connectDB