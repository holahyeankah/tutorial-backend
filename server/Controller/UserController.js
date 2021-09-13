const db = require('../database/models');
const {User}=db;
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv= require ('dotenv');

dotenv.config();

const secret =process.env.SECRET_KEY

const signUp=(req, res)=>{
 const{fullname, password}=req.body;  
 let{email}=req.body;
 email=email.toLowerCase();   
User.findOne({
    where:{
        email
    }
}).then(user=>{
    if(user){
        return res.status(404).json({message:'Email already exist '})
    }
    const saltRounds=10; 
    const hash=bcrypt.hashSync(password, saltRounds)
    User.create({
        fullname,
        email,
       password:hash,
    })
       .then(user=>{
           const token=jwt.sign({id:user.user_id},secret, {expiresIn:"1d"})
          return res.status(201).json({message:"Registartion successful", 
          user:{
               id:user.user_id,
               token
              
           }})
          
       })
       .catch(err=>{
           res.status(404).json({message:"Unable to register user"})

       }) 

 
})
 
};


const signIn=(req,res)=>{
    const {password}= req.body;
    let {email}=req.body;
    email=email.toLowerCase();

    User.findOne({      
            where:{
                email     
            }
        })
        .then(user=>{
            if(user){
                if(bcrypt.compareSync(password, user.password)){
                    const token=jwt.sign(
                        {
                        id:user.user_id,
                        email:user.email,
                        },
                        secret, {expiresIn:"1d"}
                    );
                  return res.status(201).json({
                        message:"Congratulations, you are logged in",
                        user:{
                            id:user.user_id,
                            email:user.email,
                            token

                        }
                    })

                }
                return res.status(400).json({message:"Email or password incorrect"})
            }
            return res.status(404).json({
                message:"You are yet to register. kindly sign up"
            })
        })
    }
                          
            
    const updateUserProfile=(req, res)=>{
        const {postal_code, state, address, mob_phone}=req.body;
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
            res.status(500).json({message:"Error while updating profile"})
        })
       
    };
    
    const getUserProfile=(req,res)=>{
        User.findOne({
            where:{
user_id:req.params.id
            }
        })
        .then(user=>{
            if(!user){
                return res.status(400).json({message:"No such user"})
            }
            return res.status(200).json({message:"User gotten successfully", user})
        })
    }
    



   
module.exports={signUp, signIn, getUserProfile, updateUserProfile}