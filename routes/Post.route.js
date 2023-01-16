const express=require("express")
const {Postmodel}=require("../models/Post.model")
const postRouter=express.Router();

postRouter.get("/",async(req,res)=>{
    try{
     let data=await Postmodel.find()
     res.send(data)
    }
    catch(err){
        console.log(err)
    }
res.send("All the notes")
})

postRouter.post("/create",async(req,res)=>{
    const payload=req.body;
    try{
const new_note=new Postmodel(payload)
await new_note.save();
res.send("Created the post")
    }
    catch(err){
        console.log(err)
    }
    })

    postRouter.patch("/update/:id",async(req,res)=>{
       const payload=req.body;
       const id=req.params.id;

       const note=await Postmodel.findOne({"_id":id})
       console.log(note)
       const userID_in_note=note.userID;
        const userID_making_req=req.body.userID;
        
       try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }
        else{
            await Postmodel.findByIdAndUpdate({_id:id},payload)
            res.send("updated the post")
        }
       }
       catch(err){
        console.log(err)
       }
    
        })

        postRouter.delete("/delete/:id",async(req,res)=>{
       const id=req.params.id;

       const note=await Postmodel.findOne({"_id":id})
       console.log(note)
       const userID_in_note=note.userID;
        const userID_making_req=req.body.userID;
        
       try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }
        else{
            await Postmodel.findByIdAndDelete({_id:id})
            res.send("Deleted the posts")
        }
       }
            catch(err){
                console.log(err);
            }
             res.send("Deleted the notes")
             })


             
module.exports={
    postRouter
};