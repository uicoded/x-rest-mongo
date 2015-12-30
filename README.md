# RESTful Sandbox with ExpressJS and MongoDB

POC using [Express](http://expressjs.com/) to serve RESTful APIs.

Enhanced with:

- [MongoDB](https://www.mongodb.org/) for the model persistence
- [mongoose](http://mongoosejs.com/) for elegant object modeling
- [Gulp](http://gulpjs.com/) to help with common tasks such as:
    - running [nodemon](http://nodemon.io/) for automatic restart


## Setup

1. run `npm install`


## Start

2. start `gulp`


## Example Detail

Get [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) app for comfortable API
handling. Optionally import the `data/BOOK_API.json/postman_collection` the existing collection.

Try all supported verbs: GET, POST, PUT, PATCH, DELETE


### Book Resource

        http://localhost:8000/api/Books
        http://localhost:8000/api/Books/5681fdf1d9cef1ade95abb1a
        http://localhost:8000/api/Books/?genre=Historical%20Fiction


