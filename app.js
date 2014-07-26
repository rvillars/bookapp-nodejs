var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

console.log("**** ENV: "+app.get('env'));

var mongoUrl = "tingodb:///tmp";
var port = process.env.PORT || 8080;
var ip = process.env.IP || 'localhost';

var env = process.env.NODE_ENV || 'development';

if ('development' == env) {
    app.use(morgan('dev'));
    var tungus = require('tungus');
};

if ('mongo' == env) {
    app.use(morgan('dev'));
    var mongodb = require('mongodb');
    mongoUrl = "mongodb://localhost/bookapp";
};

if ('production' == env) {
    app.use(morgan('default'));
    var mongodb = require('mongodb');
    var vcap = JSON.parse(process.env.VCAP_SERVICES);
    console.log(JSON.stringify(vcap));
    mongoUrl = vcap['mongolab'][0].credentials.uri;
    port = process.env.VCAP_APP_PORT;
};

var mongoose = require('mongoose');
var authors = require('./controller/authors');
var books = require('./controller/books');

mongoose.connect(mongoUrl);

app.use(bodyParser());
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
console.log('Listening on '+ip+":"+port+'...');