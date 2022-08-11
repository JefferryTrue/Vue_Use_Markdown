// @login & register

const express = require("express");

const router = express.Router();
//实例化路由

const User = require("../../models/User");
const Profiles = require("../../models/Profile")
// const gravatar = require("gravatar");

const jwt = require('jsonwebtoken');

const bcrypt = require("bcrypt");

const md5 = require("md5");

const keys = require("../../config/keys");

const AvatarHead = "https://cravatar.cn/avatar/";

const passport = require("passport");


// $route GET api/users/test
// @desc 返回请求的json数据
// @access public 
router.get("/test",(req,res) => {
    res.json({msg:"login works!"});
})


// $route POST api/users/register
// @desc 返回请求的json数据
// @access public 
router.post("/register",(req,res) => {
    //console.log(req.body);
    //查询数据库中是否拥有邮箱

    User.findOne({email:req.body.email})
        .then((user) => {
            if(user){
                return res.status(400).json({email:"邮箱已被注册!"});
            }
            else
            {
                // var avatar = gravatar.url(req.body.email,{s:'200',r:'pg',d:'mm'});
                 var hash = md5(req.body.email);
                 var avatar = AvatarHead + hash;
                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar:avatar,
                    password:req.body.password,
                    identity:req.body.identity
                })

                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                               .then(user => res.json(user))
                               .catch(err => console.log(err));
                    })
                })
            }
        })

})

// $route POST api/users/login
// @desc 返回 token,jwt passport
// @access public 
router.post("/login",(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    //查询数据库
    User.findOne({email:email})
        .then(user => {
            if(!user){
                return res.status(404).json("用户不存在!");
            }
            // 密码匹配
            bcrypt.compare(password,user.password)
                  .then(isMatch => {
                    if(isMatch){
                        // 规则，加密名字，过期时间，箭头函数
                        const rule = {
                            id:user.id,
                            name:user.name,
                            avatar:user.avatar,
                            identity:user.identity
                        };
                        jwt.sign(rule,keys.secretOrKey,{expiresIn:10},(err,token)=>{
                            if(err) throw err;
                            res.json({
                                success:true,
                                token:"Bearer "+token
                            })
                        })
                    }
                    else{
                        return res.status(400).json("密码错误");
                    }
                  })
        })

})

// $route GET api/users/current
// @desc 返回 current user
// @access private 
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res) => {
    res.json({
        id:req.user.id,
        name:req.user.name,
        password:req.user.password,
        identity:req.user.identity
    });
})



//定义接口方法

module.exports = router;
