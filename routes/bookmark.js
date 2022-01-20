var express = require('express');
var router = express.Router();
const app = require('../app');
const request = require('request');
var Bookmarks = require('../models/bookmark');

//show all the bookmarks
router.get('/bookmark/1', function(req,res) {
    Bookmarks.find(req.body.nickname);
    Bookmarks
});

//add bookmarks
router.post('/bookmark/2', function(req,res) {
    var localNickname = req.body.nickname;
    var localEmail = req.body.email;
});

//put memo
router.put('/bookmark/memo/1', function(req,res) { 
    var localNickname = req.body.memo;
});

//modify memo
router.put('/bookmark/memo/2', function(req,res) {
    var
});

//delete bookmark
router.delete('/bookmark/3', function(req,res) {
    var 
});

module.exports = router;