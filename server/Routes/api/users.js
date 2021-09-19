const express=require("express")
const {signUp, signIn, getUserProfile, updateUserProfile}=require ("../../Controller/UserController");
const {UserInputValidation} = require ('../../middleware/validation');

const router=express.Router();

router.post('/user/register', UserInputValidation.signUpInputValidation, signUp)
router.post('/user/login',UserInputValidation.loginInputValidation, signIn)
router.put('/profile', updateUserProfile)
router.get('/profile/:id', getUserProfile)

module.exports = router;