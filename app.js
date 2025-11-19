const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();

const port = process.nextTick.PORT ||8080;

app.use(bodyParser.json());
app.use(cors());


app.listen(port, () =>{
    console.log(`Server is running on ${port}`);
});

