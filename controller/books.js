var Book = require('../model/book');
var Author = require('../model/author');

exports.read = function (req, res) {
    var id = req.params.id;
    Book.findById(id, function (err, book) {
        console.log('Book requested with id = ' + id);
        res.json(book.populate('author'));
    });
};

exports.list = function (req, res) {
    Book.find().populate('author').exec(function (err, books) {
        console.log('Collection of Book requested');
        res.json(books);
    });
};

exports.create = function (req, res) {
    var book = new Book({ title: req.body.title, releaseDate: req.body.releaseDate, author: req.body.author._id });
    book.save(function (err, book) {
        console.log("Book created with id = " + book._id);
        Book.populate(book, {path: 'author'}, function (err, book) {
            res.json(200, book);
        });
    });
}

exports.update = function (req, res) {
    var id = req.params.id;
    var newBook = req.body;
    Book.findByIdAndUpdate(id, newBook, function(err, book) {
        console.log('Book updated with id = ' + id);
        res.json(200, book);
    });
}

exports.delete = function (req, res) {
    var id = req.params.id;
    Book.findByIdAndRemove(id, function () {
        console.log('Delete Book with id = ' + id);
        res.send(200);
    });
}