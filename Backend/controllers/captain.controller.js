const captainModel = require("../modules/caption.module");
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
