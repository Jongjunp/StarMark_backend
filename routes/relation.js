const express = require("express");
const router = express.Router();
const { readAllRelations, 
    addRelation,
    modifAttr,
    delRelation } = require('../controllers/relation');
const { isAuth } = require('../middleware');


//read all the bookmarks
router.get('/relation/1',isAuth,readAllRelations);

//add bookmarks
router.post('/relation/2',isAuth, addRelation);

//modify attribute
router.put('/relation/attr',isAuth, modifAttr);

//delete bookmark
router.delete('/relation/3',isAuth, delRelation);

module.exports = router;