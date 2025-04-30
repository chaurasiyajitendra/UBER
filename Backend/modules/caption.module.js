const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlenght:[3,'Firstname must have be 3 laters']
        },
        lastname:{
            type: String,
            minlenght: [3,'Lastname must have be 3 laters']
        }
    },
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
    },
    status:{
        type: String,
        enum: ['active','inactive'],
        default: 'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlenght:[3,'Color must be have 3 laters']
        },
        plate:{
            type: String,
            required: true,
            minlenght: [10,'min lenthg 10']
        },
        capcity:{
            type: Number,
            required: true,
            min: [1,'Must be at lest 1']
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['car','motorcycle','auto']
        }
    },
    location:{
        lat:{
            type: Number
        },
        lng:{
            type: Number
        }
    }
});

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id},process.env.JWT_SECRET,{expiresIn: '24h'});
    return token
}

captainSchema.methods.comaprePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model('captain',captainSchema);
module.exports = captainModel;