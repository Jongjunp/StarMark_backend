//mongoose object declaration
const { Int32 } = require("mongodb");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  //personal info
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  nickname:{
    type: String,
    required: true
  },
  //relation info
  friends:{
    type: [String]
  },
  bookmarks:{
    type: [String]
  }
});

module.exports = mongoose.model('user', userSchema);