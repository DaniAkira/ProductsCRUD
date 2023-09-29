const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const Product = mongoose.model('Product', {
    name: String,
    price: Number,
    size: String,
    stockAmount: Number,
    brand: String,
    type: String,
    sale: Boolean,
});

module.exports = Product;