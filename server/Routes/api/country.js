const express=require("express")
const {getCountries}=require ("../../Controller/getCountries");

const {verifyToken}=require("../../authentication/Auth")

const router=express.Router();

router.get("/countries", getCountries)



module.exports=router
