const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const collection = require("./mongodb");

app.use(express.json());
app.set("view engine","hbs")
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async (req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password
    }

    await collection.insertMany([data])

    res.render("home")
})

app.post("/login",async (req,res)=>{
    
    try{
        const check = await collection.findOne({name:req.body.name})
        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send("wrong password!!")
        }
    }
    catch{
        res.send("wrong details!!")
    }
})


app.listen(3001,()=>{
    console.log("Port connected sucessfully!");
})