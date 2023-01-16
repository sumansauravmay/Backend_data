const express=require('express')
const {connection}=require("./config/db")
require('dotenv').config();
const {postRouter} = require('./routes/Post.route')
const {userRouter}=require("./routes/User.route")
const {authenticate}=require("./middlewares/authenticate.middleware")
const cors=require("cors");

const app=express()

app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home page")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try{
await connection;
console.log(`port is running on ${process.env.port}`)
    }
    catch(err){
        console.log("error while connectiog to mongo")
        console.log(err)
    }
    
})