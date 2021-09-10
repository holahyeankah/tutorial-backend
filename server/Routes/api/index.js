const express = require ('express')
const Tutorial = require ('./Tutorial');
const User =require ('./users');

const router= express.Router()

router.use('/',  Tutorial);
router.use('/', User)

module.exports=router