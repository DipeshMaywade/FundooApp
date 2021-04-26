const express = require('express');
const app = express();

require('./config/config')()


app.listen(3000, ()=> {
    console.log("Server Runing at http://localhost:3000");
})