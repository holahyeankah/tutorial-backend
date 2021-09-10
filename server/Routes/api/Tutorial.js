const express=require("express")
const {createTutorial, findAllPublished, getAllTutorial, getOneTutorial, updateTutorial, deleteTutorial, deleteAllTutorial}=require ("../../Controller/TutorialController");

const {verifyToken}=require("../../authentication/Auth")

const router=express.Router();

router.post("/tutorial/post",verifyToken, createTutorial)
router.get("/published",  verifyToken, findAllPublished)
router.get("/tutorials", getAllTutorial)
router.get("/tutorial/:id", verifyToken, getOneTutorial)
router.put("/tutorial/:id", verifyToken, updateTutorial)
router.delete("/tutor/:id",verifyToken,  deleteTutorial)
router.delete("/tutorial", verifyToken, deleteAllTutorial)

module.exports=router
