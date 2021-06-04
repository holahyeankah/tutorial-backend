const db = require('../database/models');
const {Tutorial}=db;
const {Op}= require ('sequelize')
const {validationResult} =require ('express-validator');
const dotenv= require ('dotenv');

dotenv.config();

const createTutorial=(req, res)=>{  
    const {title, description, published}=req.body;
    console.log(req.body)
const errors=validationResult(req);

if(!errors.isEmpty()){
res.status(404).json({errors:errors.array()})
}
if(!title){
return res.status(404).json("Content cannot be empty")
}
const tutorial={
    title,
    description,
    published: published ? published :false,
    user_id:req.decoded.payrol.id,
    
}
Tutorial.create(tutorial)
.then(tutorial=>{
  res.status(200).json({message:"Tutorial created successfully", tutorial})
    
    
}).catch(err=>{
    console.log(err)
    res.status(500).json("Tutorial cant be created")
})

}

const getOneTutorial=(req, res)=>{
    const id=req.params.id
Tutorial.findByPk(id)
.then(tutorial=>{
    if(tutorial){
        return res.status(200).json({message:"Tutorial fetched successfully", tutorial})    
    }
    res.status(404).json("No such tutorial")
   
}).catch(err=>{
    res.status(500).json("Fail to get tutorial")
})
}

const findAllPublished=(req, res)=>{
    const {published}=req.body;
    Tutorial.findAll({
        where:{
            published:true
        }
    }).then(published=>{
        if(published){
        return res.status(200).json({message:"Published gotten", published})
        }
        res.status(404).json("Nothing published")
       
    }).catch(err=>{
        res.status(500).json("Fail to get published", err)
    })
}
const updateTutorial=(req, res)=>{
    const{tutorial, description, published}=req.body
    Tutorial.findOne({
        where:{
            id:req.params.id
        }
    }).then(post=>{
        if(!post){
            return res.status(404).json("post not found")
        }
        post.update({
            tutorial: tutorial || post.tutorial,
           description: description || post.description,
            published: published || post.published

        }).then(data=>{
           return res.status(200).json({
                updatedTutorial:{
                    data,
                    message:"Tutorial updated successfully"

                }
            })
        }).catch(err=>{
            res.status(500).json("Tutorial fail to update")
        })
    })
}
const deleteTutorial=(req, res)=>{
    const id=req.params.id
    Tutorial.findByPk(id)
    .then(tutorial=>{
        if(!tutorial){
            return res.status(404).json("Tutorial doesnt exist")
        }
        tutorial.destroy();
        return res.status(200).json({message:`Tutorial with id:${id}, deleted successfully`})
    }).catch(err=>{
        res.status(500).json("Tutorial fail to delete")
    })
}
const deleteAllTutorial=(req, res)=>{
   
    Tutorial.destroy({
        where:{},
        truncate:false
    }).then(tutorial=>{
        res.status(200).json({message:"Tutorial delete successfully", tutorial})
    }).catch(err=>{
        res.status(500).json("Tutorial fail to delete")
    })
    
}
const getAllTutorial=(req, res)=>{
    const {page, limit, title}=req.query;
    const offset=parseInt((page-1), 10)*limit;
    const queryBuilder={
        distinct:true,
        offset:parseFloat(offset),
        limit:parseFloat(limit)
    }
    if(title){
        queryBuilder.where={
            title:{
                [Op.like]:`%${title}`
            }
        }
    }
Tutorial.findAndCountAll(queryBuilder)
.then(tutorial=>{
    if(tutorial.rows.length <1){
        return res.status(404).json("Tutorial not found")
    }
    const currentPage=page;
    const pageSize=limit;
    const totalPages=Math.ceil(tutorial.count/pageSize)
    res.status(200).json({
        paginationMeta:{
            currentPage,
            pageSize,
            totalPages,
            totalItems:tutorial.count
        },
        tutorials:tutorial.rows
    })
}).catch(err=>{
    res.status(500).json("Some error occur while retrieving tutorials")
})

}
module.exports={createTutorial, findAllPublished, getAllTutorial, getOneTutorial, updateTutorial, deleteTutorial, deleteAllTutorial}


