//mongoose object declaration
const { Int32 } = require("mongodb");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookmarkSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  attr: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model('bookmark', bookmarkSchema);