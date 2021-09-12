const db = require('../database/models');
const {Tutorial}=db;
const {Op}= require ('sequelize')
const dotenv= require ('dotenv');

dotenv.config();

const createTutorial=(req, res)=>{  
    const {title, description, published}=req.body;
if(!title && description){
return res.status(404).json({message:"All field is required"})
}
const tutorial={
    title,
    description,
    published: published ? published :false,
    user_id:req.decoded.id,
    
}
Tutorial.create(tutorial)
.then(tutorial=>{
  res.status(200).json({message:"Tutorial created successfully", tutorial})
    
    
}).catch(err=>{

    res.status(404).json({ message:"Error occured while creating tutorial"})
})

}

const getOneTutorial=(req, res)=>{
    const id=req.params.id
Tutorial.findOne({
    where:{
        id
}})
.then(tutorial=>{
    if(!tutorial){
       res.status(404).json("No tutorial found")  
    }

    return res.status(200).json({message:"Tutorial fetched successfully", tutorial}) 
    
   
}).catch(err=>{
    res.status(500).json("Fail to get tutorial")
})
}

const findAllPublished=(req, res)=>{
    Tutorial.findAll({
        where:{
            published:true
        }
    }).then(published=>{
        if(!published){
        return res.status(404).json({message:"No published title"})
        }
        res.status(200).json({message:" Published tutorials", published})
       
    }).catch(err=>{
        res.status(500).json("Fail to get published", err)
    })
}
const updateTutorial=(req, res)=>{
    const{title, description, published}=req.body
    const{id}=req.params;
    Tutorial.findOne({
        where:{
            id
        }
    }).then(post=>{
        if(!post){
            return res.status(404).json("Post not found")
        }
        post.update({
            title: title || post.title,
           description: description || post.description,
            published: published 

        }).then(data=>{         
           return res.status(200).json({
                updatedTutorial:{
                    data,
                    message:"Tutorial updated successfully"
                }
            })
        }).catch(err=>{
            console.log(err)
            res.status(500).json({message:"Tutorial fail to update", err})
        })
    })
}
const deleteTutorial=(req, res)=>{
    Tutorial.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(tutorial=>{
        if(!tutorial) return res.status(404).json({message:"No tutorial found"})
        return res.status(200).json({message:"Tutorial deleted successfully", tutorial})
    })

         .catch(err=>{
        res.status(500).json({message:"Tutorial failed to delete", err})
    })
}

const deleteAllTutorial=(req, res)=>{
   
    Tutorial.destroy({
        where:{},
        truncate:false
    }).then(tutorial=>{
        res.status(200).json({message:"Tutorial delete successfully", tutorial})
    }).catch(err=>{
        res.status(500).json("Tutorial failed to delete")
    })
    
}
const getAllTutorial=(req, res)=>{
    const {title}=req.query;
    const condition= title ?
    {title: 
    {[Op.like] : `%${title}%`}}: null;
      
Tutorial.findAll({where:condition})
.then(tutorial=>{
    if(!tutorial){
        return res.status(404).json({message:"Tutorial not found"})
    }  
    res.status(200).json({ message:"Tutorials gotten succesfully",  tutorials:tutorial })
}).catch(err=>{
    res.status(500).json("Error occur while retrieving tutorials")
})

}
module.exports={createTutorial, findAllPublished, getAllTutorial, getOneTutorial, updateTutorial, deleteTutorial, deleteAllTutorial}


