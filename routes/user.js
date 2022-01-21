const express = require("express"); 
const router = express.Router(); 
const { signUp, signIn, signOut } = require("../controllers/user"); 

//local sign up request
router.post("/signup", signUp);
//local sign in request
router.post("/signin", signIn);
//local sign out request
router.post("/signout", signOut);

//local user login
const middle = (app) => {
    app.use("/auth", router);
};

module.exports = middle;