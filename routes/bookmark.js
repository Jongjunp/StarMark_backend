var express = require('express');
var router = express.Router();
const app = require('../app');
const GoogleSearch = require('google-images');
const url = require('url');
const request = require('request');
const fs = require('fs');
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
const client = new GoogleSearch('dc4f1ca011bbda57e','AIzaSyDq578MkaY3XqSxvYULBaszsg_shordbAA');
const pageStVal = 1;

//Search
const searchFunc = (keyword, pageStVal) =>{
    client.search(keyWord,  {page: pageStVal, size: 'large'}).then(images => {
        images.forEach(img => {
            console.log(img);
            let filePath = url.parse(img.url).pathname;
            let newFilePath = filePath.replace(/[^a-zA-Z0-8\.]+/g, '_');
            let localFilePath = saveDir + "/" + newFilePath;
            let pattern = /\.(jpg|png|gif)\b/; 
            
            // 파일길이가 200 미만이고 이미지 파일인지 체크
            if(newFilePath.length<200 && pattern.test(newFilePath)){
                try {
                    request.get(img.url).on('error', function(err) {
                        console.log('request error1:', err);
                    }).pipe(
                        fs.createWriteStream(localFilePath).on('close', function() {})
                    );
                } catch (err) {
                    console.log('request error2:', err);
                }
            };
        });
        compareTwoVal(pageStVal, pageEndVal);
    }).catch(error => {
        console.log(">>>>>>>>>>>>>>>>>>>"+error);
        console.log("모든 이미지를 수집했습니다.");
        makeImgToZip();
        return;
    });
}