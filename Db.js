const mongoose = require('mongoose');

const mongoToconnect = async() =>{
    try{
      const mongourl = process.env.MONGODB_URl;
      if(mongourl && mongourl.trim().length>0){
            await mongoose.connect(mongourl,{
                autoIndex:true,
            });
            console.log("MongoDB connected");
        }
        else{
            console.log("incorrect Mongodburl");
        }
    }catch(err){
         console.error('❌ MongoDB connection failed:', err.message);
    }

}
module.exports = mongoToconnect;