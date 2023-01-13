const express=require("express");
const mongoose = require("mongoose");
const bodyparser=require("body-parser");
require('dotenv').config();
const {connection}=require("./configs/db")
const homeroute=require("./router/home");

const app=express();

app.set("view engine","ejs");
app.use(express.static("public"));


//body parse

app.use(bodyparser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyparser.json())


app.use("/",homeroute);



app.listen(process.env.port,async()=>{
    
    try {
        await  connection;
        console.log("Data base is connected")
        
    } catch (err) {
        console.log(err)
    }
    console.log(`server is running over ${process.env.port} `);
})