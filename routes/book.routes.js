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

    router.use("/:bookId", function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else {
                if (book) {
                    // if the book is found make it available in request for
                    // downstream manipulation. Remember order matter in middleware.
                    req.book = book;
                    next();
                } else {
                    // NOTE: more testing needed. For non existing id,
                    // it returned err
                    res.status(404).send('No book found');
                }
            }
        })
    });
    router.route("/:bookId")
        .get(function (req, res) {
            res.json(req.book);
        })
        .put(function (req, res) {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        })
        .patch(function (req, res) {
            // update req.book with only req.body.attrx where attrx exists
            // except of _id
            if (req.body._id) {
                delete req.body._id;
            } else {
                for (prop in req.body) {
                    // it inherits so hasOwnProperty does not make sense
                    //if (req.book.hasOwnProperty(prop)) {
                        req.book[prop] = req.body[prop];
                    //}
                }
                req.book.save(function (err) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json(req.book);
                    }
                });
            }
        })
        .delete(function (req, res) {
            req.book.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send("Removed");
                }
            })
        });

    return router;
};

module.exports = routes;