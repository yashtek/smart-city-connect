const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { parse } = require('dotenv');


exports.createUser = async (req, res) => {
    try {
        const {
            name,
            phone,
            age,
            gender,
            aadhar,
            occupation,
            address,
            latitude,
            longitude
        } = req.body;

        const user = await User.findOne({ $or: [{ phone }, { aadhar }] });
        if (user) {
            return res.status(409).json({
                message: "User profile already exist",
                success: false
            });
        }
        const ageNum = age ? Number(age) : undefined;
        const genderNum = gender !== undefined ? Number(gender) : undefined;
        const lat = Number(req.body.latitude);
        const long = Number(req.body.longitude);

        const isvalidlet = !isNaN(lat) && lat >= -90 && lat <= 90;
        const isvalidlong = !isNaN(long) && long >= -180 && long <= 1800;


        let parsedAddress = [];

        if (req.body.address) {
            try {
                parsedAddress = JSON.parse(req.body.address);
                if (!Array.isArray(parsedAddress)) parsedAddress = [];
            } catch (err) {
                parsedAddress = [];
            }
        }



        let profileimageUrl = '';
        if (req.file) {
            profileimageUrl = `${req.protocol}://${req.get('host')}/uploads/profiles/${req.file.filename}`;
        }

        const newUser = new User({
            name,
            phone,
            age: ageNum,
            gender: genderNum,
            aadhar,
            occupation,
            address: parsedAddress,
            profileimage: profileimageUrl,
            latitude: isvalidlet ? lat : null,
            longitude: isvalidlong ? long : null

        });

        await newUser.save();

        res.status(201).json({
            message: "Profile created successfully",
            success: true,
            data: newUser
        });
    } catch (err) {

        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }

};
exports.getUser = async (req, res) => {
    try {
        const { userId } = req.query;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(409).json({
                message: "User not found",
                success: false
            });
        }
        res.status(200).json({
            message: "User fetch successfully",
            success: true,
            data: user
        });
    } catch (err) {
        console.log("error message get", err.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}


exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        const age = req.body.age !== undefined ? Number(req.body.age) : user.age;
        const gender = req.body.gender !== undefined ? Number(req.body.age) : user.age
        const lat = Number(req.body.latitude);
        const long = Number(req.body.longitude);

        const isvalidlet = !isNaN(lat) && lat >= -90 && lat <= 90;
        const isValidLng = !isNaN(long) && long >= -180 && long <= 180;

        let updateAddress = user.address;
        if (req.body.address) {
            try {
                const parsed = JSON.parse(req.body.address);
                if (Array.isArray(parsed)) updateAddress = parsed;
            } catch { };
        }
        let profileimageURL = user.profileimage;
        if (req.file) {
            profileimageURL = `${req.protocol}://${req.get('host')}/uploads/profiles/${req.file.filename}`;
        }

        const updateuser = await User.findByIdAndUpdate(userId,
            {
                $set: {
                    name: req.body.name || user.name,
                    phone: req.body.phone || user.phone,
                    age: req.body.age || user.age,
                    gender,
                    aadhar: req.body.aadhar || user.aadhar,
                    occupation: req.body.occcupation || user.occcupation,
                    address: updateAddress,
                    profileimage: profileimageURL,
                    latitude: isvalidlet ? lat : user.latitude,
                    longitude: isValidLng ? long : user.longitude
                }

            }, { new: true }
        );

        return res.status(200).json({
            message: "User update successfully",
            success: true,
            data: updateuser
        });

    } catch (error) {
        console.log("problem in user post", error.message);
        res.satatus(500).json({
            message: "Internal server error",
            success: false
        });
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.query;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(200).json({
                message: "User not found",
                success: false
            });
        }

        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            message: "User deleted successfully",
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: "problem in delete",
            success: false,
            error: error.message
        });
    }

};