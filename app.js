const express = require("express");
const app = express();
require("dotenv").config({silent:true});
const connectToMongo = require('./Db');
const router = require('./routes/authRoutes');
const routers = require('./routes/userRoutes');

const port = process.env.PORT ||8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/auth',router);
app.use('/api/user',routers)

app.listen(port, () =>{
    console.log(`Server is running on ${port}`);
});

connectToMongo();


