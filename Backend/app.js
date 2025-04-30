const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const cors =require('cors');
const app = express();
const cookiesParsr = require('cookie-parser')
const db = require('./db/db');
const userRoutes = require('./routers/user.router');
db();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookiesParsr());


app.get('/',(req, res)=>{
    res.send("Jay maa jagdmba");
});

app.use('/users',userRoutes)

module.exports = app;