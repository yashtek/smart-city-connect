const userauth = require('../models/userAuth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signupUser = async (req, res) => {
    try {
        const {
            phone, email, password
        } = req.body;

        const user = await userauth.findOne({ $or: [{ phone }, { email }] });
        if (user) {
            return res.status(409).json({
                message: "User already exist"
            });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new userauth({ phone, email, password: hashedpassword });
        await newUser.save();

        res.status(200).json({
            message: "Signup successfull",
            success: true
        });

    } catch (err) {
        console.log("Wrong happend", err.message);
        res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password, latitude, longitude } = req.body;
        const user = await userauth.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: "User not exist signup first",
                success: false
            });
        }
        const ispassEqual = await bcrypt.compare(password, user.password);
        if (!ispassEqual) {
            return res.status(403).json({
                message: "Failed try again or signup first",
                success: false
            });
        }
        const lat = Number(latitude);
        const lng = Number(longitude);

        const isValidLat = !isNaN(lat) && lat >= -90 && lat <= 90;
        const isValidLng = !isNaN(lng) && lng >= -180 && lng <= 180;

        await userauth.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    latitude: isValidLat ? lat : user.latitude,
                    longitude: isValidLng ? lng : user.longitude
                }
            }
        );

        const jwtToken = jwt.sign({
            email: user.email, _id: user._id
        }, process.env.JWT_SECRET,
            { expiresIn: '24h' });

        res.status(200).json({
            message: "Login successfull",
            success: true,
            jwtToken,
            userId: user._id

        });

    }
    catch (err) {
        console.log("login error", err.message);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });

    }

}

exports.logout = async (req,res) => {
    const token = req.headers.authorization.split(" ")[1];

    await BlacklistedToken.create({
        token,
        expiresAt: new Date(jwt.decode(token).exp * 1000)
    });
    res.status(200).json({
        message:"logout successfully",
        success:true
    });
};