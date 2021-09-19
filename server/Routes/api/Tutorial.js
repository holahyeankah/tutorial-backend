const express=require("express")
const {createTutorial, findAllPublished, getAllTutorial, getOneTutorial, updateTutorial, deleteTutorial, deleteAllTutorial}=require ("../../Controller/TutorialController");
const verifyToken= require ('../../authentication/Auth')

const router=express.Router()

router.post("/tutorial/post", verifyToken, createTutorial)
router.get("/published", findAllPublished)
router.get("/tutorials", getAllTutorial)
router.get("/tutorial/:id",  getOneTutorial)
router.put("/tutorial/:id", updateTutorial)
router.delete("/tutor/:id",  deleteTutorial)
router.delete("/tutorial", deleteAllTutorial)

module.exports=router
