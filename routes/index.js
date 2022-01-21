const express = require("express"); 
const router = express.Router(); 
const { signUp, 
    signIn, 
    signOut } = require("../controllers/user"); 
const { readAllRelations, 
    addRelation,
    modifRelationAttr,
    delRelation } = require('../controllers/relation');
const { readAllBookmarks, 
    addBookmark,
    putMemo,
    modifBookmarkAttr,
    delBookmark } = require('../controllers/bookmark');
const { isAuth } = require('../middleware');


//local sign up request
router.post("/signup", signUp);
//local sign in request
router.post("/signin", signIn);
//local sign out request
router.get("/signout", isAuth, signOut);

//read all the bookmarks
router.get('/bookmark/1',isAuth, readAllBookmarks);

//add bookmarks
router.post('/bookmark/2',isAuth, addBookmark);

//put memo
router.put('/bookmark/memo',isAuth, putMemo);

//modify attribute
router.put('/bookmark/attr',isAuth, modifBookmarkAttr);

//delete bookmark
router.delete('/bookmark/3',isAuth, delBookmark);


//read all the bookmarks
router.get('/relation/1',isAuth,readAllRelations);

//add bookmarks
router.post('/relation/2',isAuth, addRelation);

//modify attribute
router.put('/relation/attr',isAuth, modifRelationAttr);

//delete bookmark
router.delete('/relation/3',isAuth, delRelation);


module.exports = router;