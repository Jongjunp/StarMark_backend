var express = require('express');
var router = express.Router();
const app = require('../app');
const request = require('request');
var Bookmarks = require('../models/bookmark');

//show all the bookmarks
router.get('/bookmarks/1', function(req,res) {
    Bookmarks.find(req.body.nickname);
    Bookmarks
});

//add bookmarks
router.post('/bookmarks/2', function(req,res) {
    var localNickname = req.body.nickname;
    var localEmail = req.body.email;
});

//put memo
router.put('/bookmarks/memo/1', function(req,res) { 
    var localNickname = req.body.memo;
});

//modify memo
router.put('/bookmarks/memo/2', function(req,res) {
    var
});

//delete bookmark
router.delete('/bookmarks/3', function(req,res) {
    var 
});

module.exports = router;