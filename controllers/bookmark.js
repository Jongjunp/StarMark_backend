const Bookmark = require("../models/bookmark"); 

const errorGenerator = (message, statusCode = 500) => { // error 를 핸들링 하는 함수
    const error = new Error(message); // error 객체를 생성
    error.statusCode = statusCode;
    throw error; // error 를 핸들링 하는 하는 미들웨어로 에러를 던진다.
  };

//read all the bookmarks
const readAllBookmarks = async (req,res,next) => {
    try {
        const { email } = req.body;
        const bookmark = await Bookmark.find({ 'email':email });
        res.status(201).json({ message: "Load complete", bookmark });
    } catch(err) {
        next(err);
    }
}

//create a bookmark
const _createBookmark = async ({email,link,attr,memo}) => {
    const bookmark = new Bookmark({
        email: email,
        link: link,
        attr: attr,
        memo: memo
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
const modifAttr = async (req,res,next) => {
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
    } catch {
        next(err);
    }
}


//export
module.exports = { readAllBookmarks, 
    addBookmark,
    putMemo,
    modifAttr,
    delBookmark
};