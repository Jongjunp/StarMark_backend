const Bookmark = require("../models/bookmark"); 

const errorGenerator = (message, statusCode = 500) => { // error 를 핸들링 하는 함수
    const error = new Error(message); // error 객체를 생성
    error.statusCode = statusCode;
    throw error; // error 를 핸들링 하는 하는 미들웨어로 에러를 던진다.
  };

//read all the bookmarks
const readAllBookmarks = async (req,res,next) => {
    try {
        console.log("read bookmarks request");
        const { email } = req.query;
        const bookmarks = await Bookmark.find({ 'email':email });
        res.status(201).json({ message: "Load complete", bookmarks });
    } catch(err) {
        next(err);
    }
}

//read a specific bookmark
const readOneBookmark = async (req,res,next) => {
    try {
        const { email,link  } = req.query;
        const bookmark = await Bookmark.findOne({ 'email':email,'link':link });
        if(!bookmark) errorGenerator("There isn't corresponding bookmark!", 404);
        res.status(201).json({ message: "Find Bookmark", bookmark });
    } catch(err) {
        next(err);
    }
}

//create a bookmark
const _createBookmark = async ({email,bookmarkname,link,attr,memo,x_coor,y_coor}) => {
    const bookmark = new Bookmark({
        email,
        bookmarkname,
        link,
        memo,
        x_coor,
        y_coor
    });
    return bookmark.save();
};

//add a bookmark
const addBookmark = async (req,res,next) => {
    try {
        const { email,link } = req.body;
        const bookmark = await Bookmark.findOne({ 'email':email,'link':link });
        if (bookmark) errorGenerator("Same bookmark already exist!", 404);
        await _createBookmark(req.body);
        res.status(201).json({ message: "Bookmark created" });
    } catch(err) {
        next(err);
    }
}

//put memo
const putMemo = async (req,res,next) => {
    try {
        const { email,link,attr,memo } = req.body;
        const bookmark = await Bookmark.findOneAndUpdate({ 'email':email,'link':link },
        {'memo':memo},
        {new: true});
        if (!bookmark) errorGenerator("There is no bookmark for memo!", 404);
        res.status(201).json({ message: "Memo updated" });
    } catch(err) {
        next(err);
    }
}

//modify attribute
const modifBookmarkAttr = async (req,res,next) => {
    try {
        const { email,link,attr,memo } = req.body;
        const bookmark = await Bookmark.findOneAndUpdate({ 'email':email,'link':link },
        {'attr':attr},
        {new: true});
        if (!bookmark) errorGenerator("There is no bookmark for attribute!", 404);
        res.status(201).json({ message: "Attribute updated" }); 
    } catch(err) {
        next(err);
    }
}

//delete bookmark
const delBookmark = async (req,res,next) => {
    try {
        const { email,link } = req.body;
        const bookmark = await Bookmark.findOneAndDelete({ 'email':email,'link':link });
        if (!bookmark) errorGenerator("No corresponding bookmark", 404);
        res.status(201).json({ message: "Successfully deleted" }); 
    } catch(err) {
        next(err);
    }
}


//export
module.exports = { readAllBookmarks,
    readOneBookmark,
    addBookmark,
    putMemo,
    modifBookmarkAttr,
    delBookmark
};