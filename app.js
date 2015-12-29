var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var db = mongoose.connect("mongodb://localhost/bookAPI");
var app = express();
var port = process.env.PORT || 3000;

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* Models */
var Book = require("./models/bookModel");

var router = express.Router();

// Plural "Books" seem to be more common naming
router.route("/Books")
    .post(function (req, res) {
        var book = new Book(req.body);
        //  console.log(book);

        // save the book in mongodb
        book.save();
        res.status(201).send(book);
    })
    .get(function (req, res) {
    //var responseJson = {
    //    hello: "Book A"
    //};
    //res.json(responseJson);

    //not good idea to directly use user input
    //var query = req.query;
    var query = {};
    if (req.query.genre) {
        //in this way only genre query gets through
        query.genre = req.query.genre;
    }

    Book.find(query, function (err, books) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(books);
        }
    });
});

router.route("/Books/:bookId").get(function (req, res) {
    Book.findById(req.params.bookId, function (err, book) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(book);
        }
    })
});


app.use("/api", router);


app.get("/", function (req, res) {
    res.send('Welcome to API')
});

app.listen(port, function () {
    console.log("Running API app on PORT: " + port);
});