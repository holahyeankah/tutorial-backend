const jwt = require('jsonwebtoken');

const verifyToken=(req, res, next)=>{
    const bearerHeader= req.headers['authorization'];
    if(typeof bearerHeader !=='undefined'){
    const bearer= bearerHeader.split(' ');
    const bearerToken=bearer[1];
        jwt.verify(bearerToken, process.env.SECRET_KEY, (err, token) => {
            if (err) {
               return res.status(401).json({ message: 'unverified token'})
            } else {
                req.decoded = token;
                return next();
            }
        })

    } else{
       
        return res.status(404).json('unverified')
    }
}
module.exports={verifyToken}
