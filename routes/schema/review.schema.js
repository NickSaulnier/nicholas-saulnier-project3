const Schema = require('mongoose').Schema;

const UserSchema = new Schema({
    title: String,
    content: String,
    year: Number,
    director: String,
    username: String,
    timestamp: Date,
    comments: [{
        content: String,
        username: String,
        timestamp: Date
    }]
}, {
    collection: 'reviews'
})

module.exports = UserSchema;