const userModule = require('../modules/user.modules');
const blackListTokenModule = require("../modules/blackList.module");
const captainModule = require("../modules/caption.module");
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token)
    {
        return res.status(401).json({ message:'Unauthorized'});
    }
    const isBlacklisted = await blackListTokenModule.findOne({ token: token});
    if(isBlacklisted){
        return res.status(401).json({massage:'Unauthorized'});
    }
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModule.findById(decode._id);
        req.user = user;
        return next();
    }
    catch (err){
        return res.status(401).json({message :"Unauthorized"})
    }
}

module.exports.authCaptain = async(req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token)
    {
        return res.status(401).json({ message:'Unauthorized'});
    }
    const isBlacklisted = await blackListTokenModule.findOne({ token: token});
    if(isBlacklisted){
        return res.status(401).json({massage:'Unauthorized'});
    }
    try{ 
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModule.findById(decode._id);
        req.captain = captain;
        return next();
    }
    catch (err){
        return res.status(401).json({message :"Unauthorized"})
    }
}
