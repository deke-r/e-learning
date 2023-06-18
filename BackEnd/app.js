var express = require('express');
var app = express();
var path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

app.use(cookieParser());
// var multer = require('multer');
// var cookieParser = require('cookie-parser');
dotenv.config({ path: './config.env' });
app.use(express.json());
app.use(require('./router/auth'));



//Database Import--->Database
require('./Db/database');
//Database Import--->Database





// app.listen(4000);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server run on port no ${PORT}`);
});