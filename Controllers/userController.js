const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


exports.createUser = async(req , res) =>{
    try{
        const{
            name,
            phone,
            age,
            gender,
            aadhar,
            occupation,
            address,
            profileimage,
            latitude,
            longitude
        } = req.body;

        const user = await User.findOne({$or: [{phone},{aadhar}]});
        if(user){
            return res.status(409).json({
                message:"User profile already exist",
                success:false
            });
        }
        const lat = Number(req.body.latitude);
        const long = Number(req.body.longitude);

        const isvalidlet = !isNaN(lat) && lat >=-90 && lat <= 90;
        const isvalidlong = !isNaN(long) && long >=-180 && long <= 1800;
       

        const newUser = new User({
            name,
            phone,
            age,
            gender,
            aadhar,
            occupation,
            address,         // array
            profileimage,
            latitude:isvalidlet ? lat:null,
            longitude:isvalidlong?long:null
           
        });

        await newUser.save();

         res.status(201).json({
            message: "Profile created successfully",
            success: true,
            data: newUser
        });
    }catch(err){
        console.log("new user",err.message);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
      
};


exports.getUser = async(req , res) =>{
    try{
        const{userId} = req.query;
        const user = await User.findById(userId);
        if(!user){
            return res.status(409).json({
                message:"User not found",
                success:false
            });
        }
        res.status(200).json({
            message:"User fetch successfully",
            success:true,
            data:user
        });
    }catch(err){
        console.log("error message get",err.message);
        return res.status(500).json({
            message:"Internal server error",
            success:false
        });
    }
}


exports.updateUser = async(req , res) =>{
     try{
        const{userId} = req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.satatus(404).json({
                message:"User not found",
                success:false
            });
        }
        const lat = Number(req.body.latitude);
        const long = Number(req.body.longitude);

        const isvalidlet = !isNaN(lat) && lat >= -90 && lat <=90;
        const isValidLng = !isNaN(long) && long >= -180 && long <= 180;

        const updateuser = await User.findByIdAndUpdate(userId,
            {
                $set:{
                    name:req.body.name || user.name,
                    phone:req.body.phone || user.phone,
                    age:req.body.age || user.age,
                    gender:req.body.gender !== undefined ? req.body.gender:user.gender,
                    aadhar:req.body.aadhar || user.aadhar,
                    occcupation:req.body.occcupation || user.occcupation,
                    address:Array.isArray(req.body.address)?req.body.address:user.address,
                    profileimage:req.body.profileimage || user.profileimage,
                    latitude:isvalidlet? lat:user.latitude,
                    longitude:isValidLng?long:user.longitude
                }

            },{new:true}
        );
     
        return res.status(200).json({
            message:"User update successfully",
            success:true,
            data:updateuser
        });
    
    }catch(error){
        console.log("problem in user post",error.message);
        res.satatus(500).json({
            message:"Internal server error",
            success:false
        });
    } 
}


exports.deleteUser = async(req , res) =>{
    try{
        const {userId} = req.query;
        const user = await User.findById(userId);

        if(!user){
            return res.status(200).json({
                message:"User not found",
                success:false
            });
        }

        await User.findByIdAndDelete(userId);

         return res.status(200).json({
            message: "User deleted successfully",
            success: true
        });

    }catch(error){
        return res.status(500).json({
            message:"problem in delete",
            success:false,
            error:error.message
        });
    }
    
};