const { required } = require('joi');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        unique:true,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:Number,
        enum:[0,1,2], // 0 male ,1- female, 2 - both
        required:true
    },
    aadhar:{
        type:String,
        required:true,
        unique:true
    },
    profileimage:{
        type:String,
        default:""
    },
    occupation:{
        type:String,
        required:true
    },
    address:{
        _id:false,
        type:[{
            street:{type:String,required:true},
            city:{type:String,required:true},
            state:{type:String,required:true},
            zipcode:{type:String,required:true},
        }],
        default:[]
    }

},{timestamps:true});

module.exports = mongoose.model('User',userSchema);