const express = require("express"); 
const router = express.Router(); 
const session = require('express-session');
const mongoDBStore = require('express-mongodb-session')(session);
const { googleSign,
    signUp, 
    signIn, 
    signOut,
    findUser,
    userInfoModif } = require("../controllers/user"); 
const { readAllRelations,
    readOneRelation, 
    addRelation,
    modifRelationAttr,
    delRelation } = require('../controllers/relation');
const { readAllBookmarks, 
    readOneBookmark,
    addBookmark,
    putMemo,
    modifBookmarkAttr,
    delBookmark } = require('../controllers/bookmark');
const { isAuth } = require('../middleware');
const shortid = require('shortid');
const passport = require('passport'), GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();//.env 사용


//google login setup
const googleCredentials = {
    "web": {
        "client_id": "562553561444-9f0gvsveidoq9fp59qh22l83oohl2s0b.apps.googleusercontent.com",
        "client_secret": process.env.CLIENT_SECRET,
        "redirect_uris": [
            "http://192.249.18.163/auth/google/callback"
        ]
    }
}

//MIDDLEWARE
router.use(express.urlencoded({extended : false}));
router.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store : new mongoDBStore()
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
  }, googleSign
));

// Google login 
//google page 이동
router.get('/auth/google',passport.authenticate('google', { scope: ['email','profile'] }));

//callback 페이지 구성
router.get('/auth/google/callback', 
  passport.authenticate('google', { 
      successRedirect: '/',
      failureRedirect: '/auth/login' 
    })
);

//Logout - Google
router.get('/auth/logout',(req,res,next)=>{
    req.session.destroy((err)=>{
        if(err) next(err);
        req.logOut();
        res.cookie(`connect.sid`,``,{maxAge:0});
        res.redirect('/');
    });
});


//local sign up request
router.post("/api/users/signup", signUp);
//local sign in request
router.get("/api/users/signin", signIn);
//local sign out request
router.get("/api/users/signout", isAuth, signOut);
//finding user
router.get("/api/users/finduser", isAuth, findUser);
//nickname modification
router.put("/api/users/modif", isAuth, userInfoModif);


//read all the bookmarks
router.get('/api/bookmarks/1', isAuth, readAllBookmarks);
//read a bookmark
router.get('/api/bookmarks/2', isAuth, readOneBookmark);
//add bookmarks
router.post('/api/bookmarks/3', isAuth, addBookmark);
//put memo
router.put('/api/bookmarks/memo',isAuth, putMemo);
//modify attribute
router.put('/api/bookmarks/attr',isAuth, modifBookmarkAttr);
//delete bookmark
router.delete('/api/bookmarks/4',isAuth, delBookmark);


//read all the relations
router.get('/api/relations/1',isAuth,readAllRelations);
//read ont relation
router.get('/api/relation/2',isAuth, readOneRelation);
//add a relation
router.post('/api/relations/2',isAuth, addRelation);
//modify attribute
router.put('/api/relations/attr',isAuth, modifRelationAttr);
//delete relation
router.delete('/api/relations/3',isAuth, delRelation);

module.exports = router;