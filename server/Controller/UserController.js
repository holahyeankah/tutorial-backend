const db = require('../database/models');
const {User}=db;
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv= require ('dotenv');

dotenv.config();

const secret =process.env.SECRET_KEY

const signUp=(req, res)=>{
 const{fullname, email, password}=req.body;
 console.log(req.body)
    
User.findOne({
    where:{
        email
    }
}).then(user=>{
    if(user){
        return res.status(404).json({message:'Email in use by another user'})
    }
    const saltRounds=10; 
    const hash=bcrypt.hashSync(password, saltRounds)

   User.create({
       fullname,
       email,
       password:hash,
   }).then(user=>{
    return res.status(200).json({message:"Registered successfully", user})

   }).catch(err=>{
       res.status(500).json({message:'Error while creating user'})
   })
})

    
}


const signIn=(req,res)=>{
    const {email, password}= req.body;
    User.findOne({
        
            where:{
                email     
            }
        })
        .then(user=>{
         if(!user)
          return res.status(404).json({message:'User does not exist'})
             bcrypt.compare(password, user.password, (err, result)=>{
                 if (err){
                     throw new Error(err)
                 };
                 if (result){  
                  const payrol={
                         id:user.user_id,
                        fullname:user.fullname,
                     }
                       
                  jwt.sign({payrol},secret, {expiresIn: '1d'}, (err, token)=>{
                            res.json({message:
                            "Login successfuly",
                              token,                     
                             } )
                     
             })
            } else{
                res.status(404).json({message:'Incorrect password'})
                       
               
            }
        
             })
        }).catch(err=>{
                res.status(500).json({message:"Some error occurred:",  err})
        })
       
    }
    const updateUserProfile=(req, res)=>{
        const {postal_code, state, address, mob_phone, country}=req.body;
        User.findByPk(req.decoded.payrol.id)
        .then(user=>{
            if(!user){
                return res.status(404).json({message:"User with this id doesnt exist"})
            }
            if(user.id !==req.decoded.payrol.id){
                return res.status(404).json({message: 'You cant edit another user id'})
            }
            user.update({
                postal_code:postal_code ||user.postal_code,
                state:state || user.state,
                addrtess: address || user.address,
                country: country || user.country,
                mob_phone : mob_phone || user.mob_phone

            })
            return res.status(200).json({
                updatedItem:{
                    profile:{
                        name: user.fullname,
                        email:user.email
                    },
                    message:"Profile update successfully"
                }
            })
        }).catch(err=>{
            res.status(500).json({message:"Eroor while updating profile"})
        })
       
    };
    
    const getUserProfile=(req,res)=>{
        User.findByPk(req.decoded.payrol.id,(error, profile)=>{
            if(error){
                return(error)
            }else{
                res.status(200).json({message: 'Profile gotten successfully', profile})
            }
        })
    }
   
module.exports={signUp, signIn, getUserProfile, updateUserProfile}