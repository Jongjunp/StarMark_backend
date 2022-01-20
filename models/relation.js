//mongoose object declaration
const { Int32 } = require("mongodb");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var relationSchema = new Schema({
  myemail: {
    type: String,
    required: true
  },
  othersemail: {
    type: String,
    required: true
  },
  attr: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('relation', relationSchema);