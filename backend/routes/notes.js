const express=require("express");
const router=express.Router();

//ROUTE 1: Get all the notes :POST "/api/auth/fetchalnotes". login required
router.get("/fetchalnotes",(req,res)=>{
 
    res.json([]);
})

module.exports=router