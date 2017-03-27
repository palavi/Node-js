var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/libraryApp';
var ObjectId = require('mongodb').ObjectID;
var bookController = function (bookService, nav) {
    var getIndex = function (req, res) {
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(function (err, results) {
                res.render('booksListView', {
                    title: 'Books',
                    nav: nav,
                    books: results
                });
            });
        });
    };
    var getById = function (req, res) {
        var Id = new ObjectId(req.params.id);
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.findOne({ _id: Id }, function (err, results) {
                if (results.bookId) {
                    bookService.getBookById(results.bookId, function (err, book) {
                        results.book = book;
                        res.render('bookView', {
                            title: 'Books',
                            nav: nav,
                            book: results
                        });
                    });
                } else {
                    res.render('bookView', {
                            title: 'Books',
                            nav: nav,
                            book: results
                        });
                }

            });
        });
    };
    var middleware = function (req, res, next) {
        // if (!req.user) {
        // res.redirect('/');
        //}
        next();
    };
    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};
module.exports = bookController;