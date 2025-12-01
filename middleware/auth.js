const Joi = require('joi');


exports.signupvalidation = (req,res,next) =>{
    const schema = Joi.object({
        phone:Joi.string().min(10).max(10).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(100).required()
    });
    const{error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad request",error})
    }
    next();
}

exports.loginvalidation = (req,res,next) => {
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(100).required()
    });
    const{error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad request",error})
    }
    next();
}
exports.logoutvalidation = (req,res,next) => {
    const schema = Joi.object({
        email:Joi.string().required()
    });
    const{error} = schema.validate(req.headers);
    if(error){
        return res.status(400).json({
            message:"Token is required"
        });
    }
    next();
}