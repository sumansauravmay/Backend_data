const express=require("express")
const {UserModel}=require("../models/User.model")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt')


userRouter.post("/register",async (req,res)=>{
    const {email,password,name,gender}=req.body;
    try{
        bcrypt.hash(password, 5,async(err, secure_password)=>{
            // Store hash in your password DB.
    if(err){
        console.log(err)
    }
    else{
        const user=new UserModel({email,password:secure_password,name,gender});
        await user.save();
        res.send("Registered");
    }
        });
    }
    catch(err){
        res.send("err while doing registration")
    res.send(err)
    }
    })
    
    userRouter.post("/login",async(req,res)=>{
        const {email,password}=req.body;
        try{
            const user=await UserModel.find({email});
            const hashed_pass=user[0].password; 
            if(user.length>0)
            {
          bcrypt.compare(password, hashed_pass, function(err, result) {
               // result == true
    if(result){
        const token = jwt.sign({userID:user[0]._id}, 'masai');
        res.send({"msg":"Login successful","token":token});
    }
    else{
        res.send("wrong credential");
    }
                });
            }
            else{
                res.send("Wrong credential!!")
            }
            
        }
        catch(err){
            res.send(err)
        } 
    })
    
module.exports={userRouter}



