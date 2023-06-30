const express= require("express");
const dotenv=require("dotenv").config();
const connectDb = require("./config/dbConnection");

connectDb();
const app=express();
var cors = require('cors');
app.use(cors());

const port=process.env.PORTb||5000;
app.use(express.json());
app.use("/v1/videos",require("./routes/videoroutes"));
app.listen(port,()=>{
    console.log(`I am Express running on .. ${port}`);
})