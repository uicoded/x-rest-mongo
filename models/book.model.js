var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookModel = new Schema({
    title: {type: String},
    author: {type: String},
    genre: {type: String},
    read: {type: String}
});

module.exports = mongoose.model("Book", bookModel);