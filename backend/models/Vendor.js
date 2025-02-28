const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vendor', vendorSchema);
