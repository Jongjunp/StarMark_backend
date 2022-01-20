//mongoose object declaration
const { Int32 } = require("mongodb");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookmarkSchema = new Schema({
  originlink: {
    type: String,
    required: true
  },
  relatedlink: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('bookmark', bookmarkSchema);