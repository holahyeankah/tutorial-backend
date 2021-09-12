const express=require("express")
const {signUp, signIn, getUserProfile, verifyToken,  updateUserProfile}=require ("../../Controller/UserController");
const {UserInputValidation} = require ('../../middleware/validation');



const router=express.Router();

router.post('/user/register', UserInputValidation.signUpInputValidation, signUp)
router.post('/user/login',UserInputValidation.loginInputValidation, signIn)
router.put('/profile', verifyToken, updateUserProfile)
router.get('/profile/:id',verifyToken, getUserProfile)

module.exports = router;