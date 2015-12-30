var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var db = mongoose.connect("mongodb://localhost/bookAPI");
var app = express();
var port = process.env.PORT || 8000;

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Book model
var Book = require("./models/book.model.js");
var bookRouter = require("./routes/book.routes.js")(Book);

// Author model
var Author = require("./models/author.model.js");
var authorRouter = require("./routes/author.routes.js")(Author);

app.use("/api/books", bookRouter);
app.use("/api/authors", authorRouter);


app.get("/", function (req, res) {
    res.send('Welcome to Book API example: ' +
        ' <a href="api/Books">books</a>' +
        ' <a href="api/Authors">authors</a>');
});

app.listen(port, function () {
    console.log("Running API app on PORT: " + port);
});