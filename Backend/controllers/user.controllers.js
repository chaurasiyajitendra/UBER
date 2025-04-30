const userModule = require('../modules/user.modules');
const userService = require('../services/user.services');
const {validationResult} = require('express-validator');
const BlacklistTokenModule = require('../modules/blackList.module');

module.exports.registerUser = async (req,res,next)=>{   
    const erros = validationResult(req);
    if(!erros.isEmpty())
        {
            return res.status(400).json({erros: erros.array()});
        } 
        console.log(req.body);
    const { fullname,email,password} = req.body;
    const isUserExist = await userModule.findOne({email})
    if(isUserExist)
    {
        return res.status(400).json({message:'user already exist'})
    }
    const hashPassword = await userModule.hashPassword(password);
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password:hashPassword
    });
    const tokan = user.generateAuthToken();
    res.status(201).json({tokan,user})
}

module.exports.loginUser = async (req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty())
    {
        return res.status(400).json({error: error.array()});
    }
    const {email, password} = req.body;
    const user = await userModule.findOne({email}).select('+password');
    if(!user)
        {
            return res.status(401).json({message:"Invalid Email Password"});
        } 
    const isMatch = await user.comaparePassword(password);
    if(!isMatch)
    {
            return res.status(401).json({message:"Invalid Email Password"});      
    }
    const token = user.generateAuthToken();
    res.cookie('token',token);
    res.status(201).json({token,user});
}

module.exports.getUserProfile = async (req,res,next)=>{
    res.status(200).json(req.user); 
}

module.exports.logoutUser = async (req,res,next)=>{
    res.clearCookie('token');
    let token = null;
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
        await BlacklistTokenModule.create({ token });
    }
    res.status(200).json({ message: 'Logged out' });
}