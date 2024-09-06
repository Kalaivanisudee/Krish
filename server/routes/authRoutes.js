const express = require("express");
const bcrypt =  require("bcrypt");
const User = require('../models/User');
const router = express.Router();

router.post("/signup", async (req,res)=>{
const {username, password} = req.body;
try{
   await User({username:username,password:await bcrypt.hash(password,10)}).save();
   res.status(201).json({message:"User created"})


}catch(error){
res.status(500).json({error:error.message});
}
})

module.exports = router;
