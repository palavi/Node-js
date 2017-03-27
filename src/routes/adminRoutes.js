var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var books = [
  {
    title : 'The Lightning Thief',
    author : 'Rick Riordan',
    seriesT: 'Percy Jackson and the Olympians',
    bookId:28187
  },
  {
    title : 'The Sea of Monsters',
    author : 'Rick Riordan',
    seriesT : 'Percy Jackson and the Olympians',
    bookId:28186
  },
  {
    title : 'Princess Stories from Around the World',
    author : 'Kate Tym',
    seriesT : 'Percy Jackson and the Olympians',
    bookId:730914
  },
  {
    title : 'Lucene in Action, Second Edition',
    author : 'Michael McCandless',
    seriesT : 'Percy Jackson and the Olympians',
    bookId:22131010
  }
];

var router = function (nav) {
    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function (err, result) {
                    res.send(result);
                    db.close();
                });
            });
        });
    return adminRouter;
};

module.exports = router;