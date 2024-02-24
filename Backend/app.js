const express = require("express");
const app = express();
const cors=require("cors")
app.use(express.json())
app.use(cors())
//router end point
const task=require("./router/router")
app.use("/api/v1",task)


module.exports = app;
