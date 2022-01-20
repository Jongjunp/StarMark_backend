var express = require('express');
var router = express.Router();
const app = require('../app');
const GoogleSearch = require('google-images');
const url = require('url');
const request = require('request');
const fs = require('fs');
var Recommend = require('../models/recommend');
var Bookmark = require('../models/bookmark');
var recommendList = new Array();

//google 검색 api 이용 추천 bookmark list 전달
const client = new GoogleSearch('dc4f1ca011bbda57e','AIzaSyDq578MkaY3XqSxvYULBaszsg_shordbAA');
const pageStVal = 1;

//get keyword
router.get('/bookmark/keyword', function(req,res) {
    var localEmail = req.body.email;
    var localOriginLink = req.body.originlink;
    
    Bookmark.findOne({ email:,}

    )

})


//Search
const searchFunc = (keyword, pageStVal) => {
    client.search(keyWord,  {page: pageStVal, size: 'large'}).then(images => {
        images.forEach(img => {
            recommendList[index] = img.url;
    }).catch(error => {
        console.log(">> "+error);
        console.log("Collected Every Images");
        return;
    });
})}

recommendList.forEach(
    router.post('/recommend/list', function(req,res) {

    })
);


module.exports = router;