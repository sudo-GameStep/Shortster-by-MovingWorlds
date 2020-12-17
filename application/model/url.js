
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create an instance of the url schema

const UrlSchema = new Schema({
    shortcode: {type: String, unique: true },
    longUrl: {type: String},
    shortUrl: { type: String, unique: true },
    numvisits:{ type: Number, default: 0 },
    datevisit:{ type: Date, default: Date.now },
    datecreate: { type: Date, default: Date.now }
});

mongoose.model('Url', UrlSchema);