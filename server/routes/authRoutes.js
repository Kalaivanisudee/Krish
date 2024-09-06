const express = require("express");
const bcrypt =  require("bcrypt");
const User = require('../models/User');
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


module.exports = router;
