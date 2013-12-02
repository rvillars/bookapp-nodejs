var express = require('express');
var mongoose = require('mongoose');
var app = express();
var authors = require('./controller/authors');
var books = require('./controller/books');

var mongourl;
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    var tungus = require('tungus');
    mongourl = "tingodb:///tmp";
});

app.configure('local', function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    var mongodb = require('mongodb');
    mongourl = "mongodb://localhost/bookapp";
});

app.configure('prod', function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    var mongodb = require('mongodb');
    var env = JSON.parse(process.env.VCAP_SERVICES);
    mongourl = ['mongodb-1.8'][0]['credentials'];
});

mongoose.connect(mongourl);

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

app.listen(process.env.PORT);
console.log('Listening on port '+process.env.PORT+'...');