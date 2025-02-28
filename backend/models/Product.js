const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: Number,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
