var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var db = mongoose.connect("mongodb://localhost/bookAPI");
var app = express();
var port = process.env.PORT || 3000;

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Author model
var Author = require("./models/author.model");
var authorRouter = require("./routes/author.routes.js")(Author);

// Book model
var Book = require("./models/book.model");
var bookRouter = require("./routes/book.routes.js")(Book);

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