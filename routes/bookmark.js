const express = require("express");
const router = express.Router();
const { readAllBookmarks, 
    addBookmark,
    putMemo,
    modifAttr,
    delBookmark } = require('../controllers/bookmark');
const { isAuth } = require('../middleware');


//read all the bookmarks
router.get('/bookmark/1',isAuth,readAllBookmarks);

//add bookmarks
router.post('/bookmark/2',isAuth, addBookmark);

//put memo
router.put('/bookmark/memo',isAuth, putMemo);

//modify attribute
router.put('/bookmark/attr',isAuth, modifAttr);

//delete bookmark
router.delete('/bookmark/3',isAuth, delBookmark);

module.exports = router;