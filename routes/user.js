var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const app = require('../app');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected successfully');
});

var Users = require('../models/user');

//Sign up - local
router.post('/signup', function(req, res) {
    var localName = req.body.name;
    var localEmail = req.body.email;
    var localPassword = req.body.password;
    var localNickname = req.body.nickname;

    Posts.create(
        {
            name:localName,
            email:localEmail,
            password:localPassword,
            nickname:localNickname
        },
        function (error, savedDocument) {
            if (error) console.log(error);
            console.log(savedDocument);
            console.log("signup success!");
          }
    );

});

//Log in - google


//Log in - naver


//Log in -local
router.get('/login',function(req,res) {
    
})

//db에 저장된 shared object를 '/sharepost' 요청을 받으면 클라이언트로 전송
router.post('/sharepost', function(req, res) {
    var localName = req.body.username; //피드를 보여줄 username은 알고 있어야 함

    Posts.find( function(err,docs) {
        console.log("I got sharepost request");
        if (err) {
            console.log(err);
            return res.json({ 'status': 'false', 'msg': 'error occurred', 'data':'nodata' });
        }
        else {
            console.log("sharepost request success!");
            console.log(docs)
            return res.json({ 'status': 'true', 'msg': 'results:', 'data': docs });
        }
    });

});

module.exports = router;