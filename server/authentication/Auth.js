const jwt = require('jsonwebtoken');

const dotenv= require ('dotenv');

dotenv.config();

const secret=  process.env.SECRET_KEY

export const verifyToken=(req, res, next)=>{
    const bearerHeader= req.headers['authorization'];
    if(typeof bearerHeader !=='undefined'){
    const bearer= bearerHeader.split(' ');
    const bearerToken=bearer[1];
        jwt.verify(bearerToken, secret, (err, token) => {
            if (err) {
               return res.status(401).json({ message:'Unverified token'})
            } else {
                req.decoded = token;
                return next();
            }
        })

    } else{
       
        return res.status(404).json({message:'Unverified'})
    }
}


