const userModule = require('../modules/user.modules');

module.exports.createUser = async ({
    firstname,lastname,email,password
})=>{
    if(!firstname || !email || !password)
    {
        throw new Error("All fields are required")
    }
    const user = userModule.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}