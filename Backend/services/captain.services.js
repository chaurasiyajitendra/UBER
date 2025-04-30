const captainModel = require('../modules/caption.module');

module.exports.createCaptain = async ({
    firstname,lastname,email,password,
    color,plate,capcity,vehicleType
})=>{
    if(!firstname || !email || !password || !color || !plate || !capcity || !vehicleType)
    {
        throw new Error("All filds required !!")
    }
    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capcity,
            vehicleType
        }
    })
    return captain;
}