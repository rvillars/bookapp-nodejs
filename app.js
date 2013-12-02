var express = require('express');
var app = express();

console.log("**** ENV: "+app.get('env'));

var mongoUrl = "tingodb:///tmp";
var port = 8080;

app.configure('development', function () {
    app.use(express.logger('dev'));
    var tungus = require('tungus');
});

app.configure('mongo', function () {
    app.use(express.logger('dev'));
    var mongodb = require('mongodb');
    mongoUrl = "mongodb://localhost/bookapp";
});

app.configure('production', function () {
    app.use(express.logger('default'));
    var mongodb = require('mongodb');
    var env = JSON.parse(process.env.VCAP_SERVICES);
    mongoUrl = env['mongodb-1.8'][0]['credentials'];
    port = process.env.VCAP_APP_PORT;
});

var mongoose = require('mongoose');
var authors = require('./controller/authors');
var books = require('./controller/books');

mongoose.connect(mongoUrl);

app.use(express.bodyParser());
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

app.listen(port);
console.log('Listening on port '+port+'...');