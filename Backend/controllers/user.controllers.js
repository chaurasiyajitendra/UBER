const userModule = require('../modules/user.modules');
const userService = require('../services/user.services');
const {validationResult} = require('express-validator');

module.exports.registerUser = async (req,res,next)=>{   
    const erros = validationResult(req);
    if(!erros.isEmpty())
        {
            return res.status(400).json({erros: erros.array()});
        } 
        console.log(req.body);
    const { fullname,email,password} = req.body;
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
