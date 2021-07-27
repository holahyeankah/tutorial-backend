const express = require ('express')
const Tutorial = require ('./Tutorial');
const User =require ('./users');
const countries =require ('./country');
const router= express.Router()

router.use('/',  Tutorial);
router.use('/', User)
router.use('/', countries)

module.exports=router