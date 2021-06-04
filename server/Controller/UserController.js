const db = require('../database/models');
const {User}=db;
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} =require ('express-validator');
const dotenv= require ('dotenv');

dotenv.config();

const signUp=(req, res)=>{
    const{first_name, last_name, email, password}=req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}
User.findOne({
    where:{
        email
    }
}).then(user=>{
    if(user){
        return res.status(404).json('user already exist')
    }
    const saltRounds=10;
   const hash=bcrypt.hashSync(password, saltRounds)
   User.create({
       first_name,
       last_name,
       email,
       password:hash
   }).then(user=>{
       res.status(200).json({message:"user successfully created", user})

   }).catch(err=>{
       res.status(500).json('Cannot create user')
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
          return res.status(404).json('User doesnt exist')
             bcrypt.compare(password, user.password, (err, result)=>{
                 if (err){
                     throw new Error(err)
                 };
                 if (result){  
                     delete user.password; 
                     const payrol={
                         id:user.user_id,
                        name:user.first_name + " " + user.last_name
                     }
                       
                  jwt.sign({payrol},process.env.SECRET_KEY, {expiresIn: '1d'}, (err, token)=>{
                            res.json({message:
                            "Login successfuly",
                              token,                     
                             } )
                     
             })
            } else{
                res.status(404).json(
                     ' Incorrect password '
                       
                )
            }
        
             })
        }).catch(err=>{
                res.status(500).json({message:"Some error occurred:",  err})
        })
       
    }
    const getAllUser=(req, res)=>{
        user.findAll().then(user=>{
            res.json(user)
           
            
        })
    };
    
    const getOneUser=(req,res)=>{
        user.findById(req.params.id,(error, data)=>{
            if(error){
                return(error)
            }else{
                res.status(200).json({message:data})
            }
        })
    }
   
module.exports={signUp, signIn, getAllUser, getOneUser}