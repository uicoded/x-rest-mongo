var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var db = mongoose.connect("mongodb://localhost/bookAPI");
var app = express();
var port = process.env.PORT || 3000;

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Book model
var Book = require("./models/bookModel");
var bookRouter = require("./routes/book.routes.js")(Book);


app.use("/api/books", bookRouter);


app.get("/", function (req, res) {
    res.send('Welcome to Book API example. Go to <a href="api/Books">books</a>');
});

app.listen(port, function () {
    console.log("Running API app on PORT: " + port);
});