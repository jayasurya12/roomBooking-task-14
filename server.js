const express=require("express");
const roomRouter=require("./routers");
const connectDB=require("./config/db");
const dotevn=require("dotenv");

const app=express();
app.use(express.json());
dotevn.config({path:"./config/env.env"})
connectDB()

app.get("/",(req,res)=>{
    res.json("it is work")
})
app.use("/",roomRouter)


app.listen(5000,()=>{
    console.log("server start");
})