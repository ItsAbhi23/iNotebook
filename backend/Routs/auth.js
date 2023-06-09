const express=require('express');
const router=express.Router();
const User=require('../models/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchUser')
const JWT_SECRET='meranameabhi@hai'

//Route 1:Create a user using :Post  /api/auth/createuser
router.post('/createuser',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
],async (req,res)=>{
    let success=false;
  //if there are error return  bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try{
      let user=await User.findOne({email:req.body.email});
   if(user){
    return res.status(400).json({success,error:"a user with this email already exist"});
   }
     const salt=await bcrypt.genSalt(10);
     const sepPas= await bcrypt.hash(req.body.password,salt);
      user=await User.create({
        username: req.body.name,
        password: sepPas,
        email: req.body.email,

      }) 
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_SECRET);
      // res.json(user)
      success=true;
     return res.json({success,authtoken});
} 
catch (error){
console.error(error.message);
return res.status(500).send("some error occured");
}
})

// Route 2: Authenticate the user using : POST "/api/auth/login" No login required
router.post('/login',[
  body('email').isEmail(),
  body('password','password can not be blank').exists(),
],async (req,res)=>{
  //if there are error return  bad request and error
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email ,password}=req.body;
  try {
    let user=await User.findOne({email});
    if(!user){
     return res.status(400).json({error :"Please try to login using correct credentials"});
       }
       const passwordCompare=await bcrypt.compare(password,user.password);
       if(!passwordCompare){
      return  res.status(400).json({error :"Please try to login using correct credentials"});

       }
       const data={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_SECRET);
      // res.json(user)
      success=true;
     return res.json({success,authtoken});
  } catch (error){
    console.error(error.message);
   return res.status(500).send("Enternal server occur");
    }
})

// Route 3: Get logged in user details using : POST "/api/auth/getuser"  login required
router.get('/getuser',fetchuser,async (req,res)=>{
try {
  const userId=req.user.id;
  const user=await User.findById(userId).select("-password");
  return res.send(user);
} catch (error){
  console.error(error.message);
 return res.status(500).send("Enternal server occur");
  }
})

module.exports=router