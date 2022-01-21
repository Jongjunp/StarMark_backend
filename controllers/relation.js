const Relation = require("../models/relation"); 

const errorGenerator = (message, statusCode = 500) => { // error 를 핸들링 하는 함수
    const error = new Error(message); // error 객체를 생성
    error.statusCode = statusCode;
    throw error; // error 를 핸들링 하는 하는 미들웨어로 에러를 던진다.
};

//read all the bookmarks
const readAllRelations = async (req,res,next) => {
    try {
        const { myemail } = req.body;
        const relation = await Relation.find({ 'myemail':myemail });
        res.status(201).json({ message: "Load complete", relation });
    } catch(err) {
        next(err);
    }
}

//create a bookmark
const _createRelation = async ({myemail,othersemail,attr}) => {
    const relation = new Relation({
        myemail: myemail,
        othersemail: othersemail,
        attr: attr
    });
    return relation.save();
};

//add a bookmark
const addRelation = async (req,res,next) => {
    try {
        const { myemail,othersemail } = req.body;
        const relation = await Relation.findOne({ 'myemail':myemail,'othersemail':othersemail });
        if (relation) errorGenerator("You already have a relation", 404);
        await _createBookmark(req.body);
        res.status(201).json({ message: "Relation created" });
    } catch(err) {
        next(err);
    }
}


//modify attribute
const modifAttr = async (req,res,next) => {
    try {
        const { myemail,othersemail,attr } = req.body;
        const relation = await Relation.findOneAndUpdate({ 'myemail':myemail,'othersemail':othersemail },
        {'attr':attr},
        {new: true});
        if (!relation) errorGenerator("There is no relation for attribute!", 404);
        res.status(201).json({ message: "Attribute updated" }); 
    } catch(err) {
        next(err);
    }
}

//delete bookmark
const delRelation = async (req,res,next) => {
    try {
        const { myemail,othersemail } = req.body;
        const relation = await Relation.findOneAndDelete({ 'myemail':myemail,'othersemail':othersemail });
        if (!relation) errorGenerator("No corresponding relation", 404);
        res.status(201).json({ message: "Successfully deleted" }); 
    } catch {
        next(err);
    }
}


//export
module.exports = { readAllRelations, 
    addRelation,
    modifAttr,
    delRelation
};