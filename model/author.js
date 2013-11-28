var mongoose = require('mongoose')

var authorsSchema = mongoose.Schema({
    firstname: String,
    lastname: String
});

authorsSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

authorsSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Author', authorsSchema);