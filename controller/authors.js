var Author = require('../model/author');

exports.read = function (req, res) {
    var id = req.params.id;
    Author.findById(id, function (err, author) {
        console.log('Author requested with id = ' + id);
        res.json(author);
    });
};

exports.list = function (req, res) {
    Author.find(function (err, authors) {
        console.log('Collection of Author requested');
        res.json(authors);
    });
};

exports.create = function (req, res) {
    var author = new Author(req.body);
    author.save(function (err, author) {
        console.log("Author created with id = " + author._id);
        res.json(200, author);
    });
};

exports.update = function (req, res) {
    var id = req.params.id;
    var newAuthor = req.body;
    Author.findByIdAndUpdate(id, newAuthor, function(err, author) {
        console.log('Author updated with id = ' + id);
        res.json(200, author);
    });
};

exports.delete = function (req, res) {
    var id = req.params.id;
    Author.findByIdAndRemove(id, function () {
        console.log('Delete Author with id = ' + id);
        res.send(200);
    });
};