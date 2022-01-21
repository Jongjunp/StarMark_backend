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
    readOneBookmark,
    addBookmark,
    putMemo,
    modifBookmarkAttr,
    delBookmark } = require('../controllers/bookmark');
const { isAuth } = require('../middleware');


//local sign up request
router.post("/users/signup", signUp);
//local sign in request
router.get("/users/signin", signIn);
//local sign out request
router.get("/users/signout", isAuth, signOut);


//read all the bookmarks
router.get('/bookmarks/1',isAuth, readAllBookmarks);
//read a bookmark
router.get('bookmarks/2',isAuth, readOneBookmark);
//add bookmarks
router.post('/bookmarks/3',isAuth, addBookmark);
//put memo
router.put('/bookmarks/memo',isAuth, putMemo);
//modify attribute
router.put('/bookmarks/attr',isAuth, modifBookmarkAttr);
//delete bookmark
router.delete('/bookmarks/4',isAuth, delBookmark);


//read all the bookmarks
router.get('/relations/1',isAuth,readAllRelations);
//add bookmarks
router.post('/relations/2',isAuth, addRelation);
//modify attribute
router.put('/relations/attr',isAuth, modifRelationAttr);
//delete bookmark
router.delete('/relations/3',isAuth, delRelation);

module.exports = router;