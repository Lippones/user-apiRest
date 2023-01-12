const jwt = require('jsonwebtoken')
const secret = "dwpq2jnza4"


module.exports = function(req,res,next){
    try{
        const authToken = req.headers['authorization']
        if(authToken != undefined){
        const bearer = authToken.split(' ')
        const token = bearer[1]

        const decoded = jwt.verify(token,secret)
        if(decoded.role ==1){
            next()
        }else{
            res.status(403).json({message:"User not authorized"})
        }
        
    }
    }catch(err){
        res.json({err: "Token is required"})
    }
}