var express = require('express');
var tungus = require('tungus');
//var mongodb = require('mongodb');
var mongoose = require('mongoose');
var authors = require('./controller/authors');
var books = require('./controller/books');

var app = express();

mongoose.connect('tingodb://c:/tmp');
//mongoose.connect('mongodb://localhost/bookapp');

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/rest/authors', authors.list);
app.get('/rest/authors/:id', authors.read);
app.post('/rest/authors', authors.create);
app.put('/rest/authors/:id', authors.update);
app.delete('/rest/authors/:id', authors.delete);

app.get('/rest/books', books.list);
app.get('/rest/books/:id', books.read);
app.post('/rest/books', books.create);
app.put('/rest/books/:id', books.update);
app.delete('/rest/books/:id', books.delete);

app.use('/', express.static(__dirname + '/public'));

app.listen(8080);
console.log('Listening on port 3000...');

