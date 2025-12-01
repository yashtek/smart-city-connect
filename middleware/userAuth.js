const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    try{
        const header = req.headers.authorization;
        if(!header){
            return res.status(401).json({
                message:"No token provided",
                success:false
            });
        }

        const token = header.split(" ")[1];
        if(!token){
            return res.status(401).json({
                message:"Invalid token format",
                success:false
            });
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(error){
        return res.status(500).json({
            message:"check middleware logics",
            success:false,
            error:error.message
        })
    }
}