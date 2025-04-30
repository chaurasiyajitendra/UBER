const userModule = require('../modules/user.modules');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token)
    {
        return res.status(401).json({ message:'Unauthorized'});
    }
    const isBlacklisted = await userModule.findOne({ token: token});
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