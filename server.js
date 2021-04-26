const express = require('express');
const app = express();
require("dotenv").config();

const port = process.env.PORT;
const host = process.env.HOST;

require('./config/config')()

app.listen(port, ()=> {
    console.log(`Server Runing at http://${host}:${port}`);
})