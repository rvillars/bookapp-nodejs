var mongoose = require('mongoose')
var Author = require('./author')

var bookSchema = mongoose.Schema({
    title: String,
    releaseDate: Date,
    author: {type: mongoose.Schema.ObjectId, ref: 'Author'}
});

bookSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

bookSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Book', bookSchema);