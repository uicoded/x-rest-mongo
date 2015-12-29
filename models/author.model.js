var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// http://mongoosejs.com/docs/schematypes.html

var authorModel = new Schema({
    name: {type: String},
    fulltitle: {type: String},
    pseudomym: {type: String},
    gender: {type: String},
    born: {type: String},
    died: {type: String},
    // TODO: check how the native could be saved, e.g. POSTed via Postman
    //born: {type: Date},
    //died: {type: Date},
    bio: {type: String}
});

module.exports = mongoose.model("Author", authorModel);