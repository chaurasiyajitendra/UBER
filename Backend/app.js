const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const cors =require('cors');
const app = express();
const cookiesParsr = require('cookie-parser')
const db = require('./db/db');
db();
const userRoutes = require('./routers/user.router');
const captainRoutes = require("./routers/caption.routes");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookiesParsr());


app.get('/',(req, res)=>{
    res.send("Jay maa jagdmba");
});

app.use('/users',userRoutes);
app.use('/captain',captainRoutes)



module.exports = app;