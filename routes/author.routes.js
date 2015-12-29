var express = require("express");

/**
 * Resource
 *
 * Uses Express router to make REST API for common resource
 * For now it uses Author but can be genelized.
 *
 * @param Author
 * @returns {Object} router
 */
var routes = function resource (Author) {

    // http://expressjs.com/en/4x/api.html#router
    var router = express.Router();

    // Plural "Authors" seem to be more common naming
    // TODO: find out if it is instance or can be extended (getting singleton)
    router.route("/")
        .post(function (req, res) {
            var author = new Author(req.body);
            // console.log(book);

            // save the book in mongodb
            author.save();
            res.status(201).send(author);
        })
        .get(function (req, res) {

            Author.find(function (err, author) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(author);
                }
            });
        });

    router.route("/:authorId").get(function (req, res) {
        Author.findById(req.params.authorId, function (err, author) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(author);
            }
        })
    });

    return router;
};

module.exports = routes;