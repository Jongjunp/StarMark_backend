var express = require('express');
var router = express.Router();
const app = require('../app');
const GoogleSearch = require('google-images');
const url = require('url');
const request = require('request');
const fs = require('fs');
var Recommend = require('../models/recommend');


//google 검색 api 이용 추천 bookmark list 전달
const client = new GoogleSearch('dc4f1ca011bbda57e','AIzaSyDq578MkaY3XqSxvYULBaszsg_shordbAA');
const pageStVal = 1;

//Search
const searchFunc = (keyword, pageStVal) => {
    client.search(keyWord,  {page: pageStVal, size: 'large'}).then(images => {
        images.forEach(img => {
            img.url
    }).catch(error => {
        console.log(">> "+error);
        console.log("Collected Every Images");
        return;
    });
}

router.get()


module.exports = router;