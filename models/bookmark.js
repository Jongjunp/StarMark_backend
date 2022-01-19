//mongoose object declaration
const { Int32 } = require("mongodb");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookmarkSchema = new Schema({
  //personal info
  link: {
    type: String,
    required: true
  },
  userlist: {
      type: [String]
  }
});

module.exports = mongoose.model('bookmark', bookmarkSchema);