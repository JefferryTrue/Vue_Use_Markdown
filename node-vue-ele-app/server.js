const express = require("express");
//引入express

const mongoose = require("mongoose");
//引入mongoose

const bodyParser = require("body-parser");

const app = express();
//实例化express

// 引入router
const users = require("./routes/api/users");
const profiles = require('./routes/api/profiles');

//db config
const db = require("./config/keys").mongoURI;

// 使用body-parser中间键
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Connect to mongodb
mongoose.connect(db)
        .then(() => console.log("Mongodb connected!"))
        .catch(err => console.log(err));

const passport = require("passport");
app.use(passport.initialize());
require("./config/passport")(passport);


app.get("/",(req,res) => {
    res.send("hello world!");
})
//配置路由

//使用routes
app.use("/api/users",users);
app.use("/api/profiles",profiles);


const port = process.env.PORT || 5000;
//指定端口

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})
//监听端口,记得用反引号`


/*
Section1:
运行 cmd:   
    node server.js

安装自动运行工具nodemon:
    npm install nodemon

在package.json中配置自动启动:
    "scripts": {
        "start": "node server.js",
        "server":"nodemon server.js"
    },
运行:
    npm run start
    npm run server

    http://localhost:5000

Section2:
配置数据库MongoDb:


*/

