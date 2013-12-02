var express = require('express');
var app = express();

console.log("**** ENV: "+app.get('env'));

var mongourl;
var useTingo;
var port; 

app.configure('development', function () {
    app.use(express.logger('dev'));
    useTingo = true;
    mongourl = "tingodb:///tmp";
    port = 8080;
});

app.configure('cloud9', function () {
    app.use(express.logger('dev'));
    useTingo = true;
    mongourl = "tingodb:///tmp";
    port = process.env.PORT;
});

app.configure('local', function () {
    app.use(express.logger('dev'));
    useTingo = false;
    var mongodb = require('mongodb');
    mongourl = "mongodb://localhost/bookapp";
    port = 8080;
});

app.configure('production', function () {
    app.use(express.logger('default'));
    useTingo = false;
    var mongodb = require('mongodb');
    var env = JSON.parse(process.env.VCAP_SERVICES);
    mongourl = ['mongodb-1.8'][0]['credentials'];
    port = process.env.VCAP_APP_PORT;
});

if (useTingo) {
    var tungus = require('tungus');
}
var mongoose = require('mongoose');
var authors = require('./controller/authors');
var books = require('./controller/books');

mongoose.connect(mongourl);

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