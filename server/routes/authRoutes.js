const express = require("express");
const bcrypt =  require("bcrypt");
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/signup", async (req,res)=>{
const {username, password} = req.body;
try{
    const hashedPassword = await bcrypt.hash(password,10);
   const newUser = User({username:username,password:hashedPassword })
   await newUser.save();
   res.status(201).json({message:"User created"});

}catch(error){
res.status(500).json({error:error.message});
}
})
router.post("/login",async(req,res)=>{
const {username,password} = req.body;
try{
const user = await User.findOne({username:username});
const authenticated = await bcrypt.compare(password,user.password);
if(user && authenticated){
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
    res.json({token:token});
}else{
    res.status(401).json({error:"Invalid credentials"});
}
}catch(error){
res.staus(500).json({error:"Error while logging In "});
}
})

module.exports = router;
