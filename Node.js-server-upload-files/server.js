
const express = require("express");

const multer = require("multer");

const app = express();

const cors = require('cors');

app.use(cors());

let objMulter = multer({dest:"./public/upload"});

app.use(objMulter.any());

app.use(express.static("./public/upload"));

const uploadimg = require('./router/uploadimg');

app.use('/api',uploadimg);

app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000');
})
