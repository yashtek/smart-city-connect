const mongoose = require('mongoose');

const UserAuth = mongoose.Schema({
    phone: {
        type:String,
        unique:true,
        required:true,
        sparse:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        sparse:true,
    }
},{timestamps:true});

module.exports = mongoose.model('UserAuth',UserAuth)

