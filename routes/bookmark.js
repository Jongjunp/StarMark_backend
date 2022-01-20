var express = require('express');
var router = express.Router();
const app = require('../app');
var Bookmarks = require('../models/bookmark');

//show all the bookmarks
router.get('/', function(req,res) {
    Bookmarks.find(req.body.nickname);
    Bookmarks
});

//add bookmarks
router.post('/', function(req,res) {
    var localNickname = req.body.nickname;
    var localEmail = req.body.email;
});

//put memo
router.post('/', function(req,res) { 
    var localNickname = req.body.memo
});


//friend recommendation
router.get('/', function() {

});

//google 검색 api 이용 추천 bookmark list 전달
