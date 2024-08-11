const jwt = require ('jsonwebtoken')
const config= "samael98"




module.exports = function (req , res ,next){
    // get token from header 
    const token = req.header('x-auth-token');
    // check if token exists

    if(!token){
        return res.status(401).json({msg : "No token , denied"})


    }


    //check token 

    try {
      const decoded = jwt.verify(token , config);
      req.user= decoded.user;
      next() 
    } catch (error) {
        res.status(401).json({msg : 'token invalid , denied'})
    }
}