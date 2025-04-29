const mongoose = require('mongoose');
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required:true,
            minlength:[3,'First Name must be at lest 3 Character long' ]
        },
        lastname:{
            type: String,
            minlength:[3,'First Name must be at lest 3 Character long' ]
        }},
        email:{
            type:String,
            required:true,
            unique:true,
            minlength:[5,'email must be 5 character long ']
        },
        password:{
            type:String,
            required:true,
            select:false
        },
        stoketId:{
            type:String
        }
})

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id},process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comaparePassword = async function(password){
    return await bycrpt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bycrpt.hash(password,10);
}

const userModule = mongoose.model('user',userSchema);
module.exports = userModule;