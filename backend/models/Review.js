const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    comment: String,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', reviewSchema);
