var express = require("express");

/**
 * Resource
 *
 * Uses Express router to make REST API for common resource
 * For now it uses Book but can be genelized.
 *
 * @param Book
 * @returns {Object} router
 */
var routes = function resource (Book) {

    // http://expressjs.com/en/4x/api.html#router
    var router = express.Router();

    //console.log(Book.toString());

    // Plural "Books" seem to be more common naming
    // TODO: find out if it is instance or can be extended (getting singleton)
    router.route("/")
        .post(function (req, res) {
            var book = new Book(req.body);
            // console.log(book);

            // save the book in mongodb
            book.save();
            res.status(201).send(book);
        })
        .get(function (req, res) {

            // not good idea to directly use user input
            // var query = req.query;
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

    router.route("/:bookId")
        .get(function (req, res) {
            Book.findById(req.params.bookId, function (err, book) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(book);
                }
            })
        })
        .put(function (req, res) {
            Book.findById(req.params.bookId, function (err, book) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    // seems fragile
                    // if req.body.x was not sent it is undefined
                    book.title = req.body.title;
                    book.author = req.body.author;
                    book.genre = req.body.genre;
                    book.read = req.body.read;
                    book.save();
                    res.status(201).json(book);
                }
            });
        });

    return router;
};

module.exports = routes;