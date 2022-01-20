var express = require('express');
var router = express.Router();
const shortid = require('shortid');
const passport = require('passport')
,GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;



//google login setting
const googleCredentials = {
    "web": {
        "client_id": "562553561444-9f0gvsveidoq9fp59qh22l83oohl2s0b.apps.googleusercontent.com",
        "client_secret": "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",
        "redirect_uris": [
            "http://192.249.18.163/auth/google/callback"
        ]
    }
}

//MIDDLEWARE
router.use(express.urlencoded({extended : false}));
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store : new fileStore()
}));

//PASSPORT - MIDDLEWARE
router.use(passport.initialize());
router.use(passport.session());

//에러처리
router.use((err,req,res,next)=>{
    if(err) console.log(err);
    res.send(err);
  });

//PASSPORT - 직렬화 
//serializeUser : 로그인 / 회원가입 후 1회 실행
//deserializeUser : 페이지 전환시 마다 실행 
passport.serializeUser(function(user, done) {
    done(null, user);
  });
passport.deserializeUser(function(user, done) {
	done(null, user);
});

//PASSPORT (Google) - 구글 로그인시 정보 GET
passport.use(new GoogleStrategy({
    clientID: googleCredentials.web.client_id,
    clientSecret: googleCredentials.web.client_secret,
    callbackURL: googleCredentials.web.redirect_uris[0]
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(profile);
       let user = db.find(userInfo => userInfo.email === profile.emails[0].value);
       if(user) {
           user.provider = profile.provider;
           user.providerId = profile.id;
           user.token = accessToken;
           user.name = profile.displayName;
       }else {
           user = {
               id : shortid.generate(),  
               provider : profile.provider,
               providerId : profile.id,
               token : accessToken,
               name : profile.displayName,
               email : profile.emails[0].value
           }
           db.push(user);
       }
         return done(null, user);
  }
));

/* Google login */
//google page 이동
router.get('/auth/google',passport.authenticate('google', { scope: ['email','profile'] }));

//callback 페이지 구성
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  function(req, res) {
      res.redirect('/');
});


//Logout - Google
router.get('/auth/logout',(req,res,next)=>{
    req.session.destroy((err)=>{
        if(err) next(err);
        req.logOut();
        res.cookie(`connect.sid`,``,{maxAge:0});
        res.redirect('/');
    });
});


var Users = require('../models/user');

//Sign up - local
router.post('/users/signup', function(req, res) {
    var localName = req.body.name;
    var localEmail = req.body.email;
    var localPassword = req.body.password;
    var localNickname = req.body.nickname;

    Users.create(
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


//Log in - local
router.get('/users/login',function(req,res) {
    Users.findOne({ email: req.body.email, password: req.body.password }, (err, user) => {
        if (err) {
          return res.json({ 'ok': false, 'data':'nodata' });
         }
        else if (user) {
          console.log(user);
          return res.json({ 'ok': true, 'data':[user.nickname, user.email]});
        }
        else {
          return res.json({ 'ok': false, 'data':'nodata' });
        }
      });
});


//Log out - local
router.get('/users/logout', function(req,res) {
    req.session.destroy((err)=>{
        if(err) next(err);
        req.logOut();
        res.cookie(`connect.sid`,``,{maxAge:0});
        res.redirect('/');
    });
});

module.exports = router;