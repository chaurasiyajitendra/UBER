const blackListModule = require("../modules/blackList.module");
const captainModel = require("../modules/caption.module");
const userModule = require("../modules/user.modules");
const captianServices = require("../services/captain.services");
const {validationResult} = require('express-validator')
 
module.exports.registerCaption = async (req, res ,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty())
    {
        return res.status(401).json({error :error.array()});
    }
    const {fullname,email,password,vehicle} = req.body;
    const isCaptaionExist = await captainModel.findOne({email});
    if(isCaptaionExist)
    {
        return res.status(400).json({message:'Caption already exist'})
    }
    const hashPassword = await captainModel.hashPassword(password);
    const captain = await captianServices.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capcity:vehicle.capcity,
        vehicleType:vehicle.vehicleType
    });
    const token = captain.generateAuthToken();
    res.status(201).json({token,captain});
} 

module.exports.loginCaption = async (req ,res , next)=>{
    const error = validationResult(req);
    if(!error.isEmpty())
    {
        return res.status(400).json({error:error.array});
    }
    const {email, password} = req.body;
    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain)
    {
        return res.status(401).json({message:"inavlid Email password"});
    }
    const isMatch = await captain.comaprePassword(password);
    if(!isMatch)
    {
        return res.status(401).json({message:"inavlid Email password"});
    }
    const token = captain.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token,captain});
}

module.exports.getCaptainProfile = async (req,res,next)=>{
   return res.status(200).json({captain: req.captain});
}

module.exports.loggedOutCaptain = async(req,res,next)=>{
    res.clearCookie('token');
    let token = null;
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
        await blackListModule.create({ token });
    }
    res.status(200).json({ message: 'Logged out' });
}  