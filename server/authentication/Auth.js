const jwt = require('jsonwebtoken');

const dotenv= require ('dotenv');

dotenv.config();
const secret =process.env.SECRET_KEY

const verifyToken=(req, res, next)=>{
    const bearerHeader= req.headers['authorization'];
    console.log("my token",bearerHeader)
    if(typeof bearerHeader !=='undefined'){
      const bearer= bearerHeader.split(' ');
      const bearerToken=bearer[1];
        jwt.verify(bearerToken, secret, (err, decoded) => {
            if (err) {
               return res.status(401).json({ message: 'unverified token'})
            } else {
                req.decoded=decoded
                return next();
            }
        })

    } else{
       
        return res.status(404).json('unverified')
    }
}
       



module.exports= verifyToken


