const Review = require('../models/Review');
const Product = require('../models/Product');
const Vendor = require('../models/Vendor');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get a review by ID
// @route   GET /api/reviews/:id
// @access  Public
exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Public
exports.createReview = async (req, res) => {
    try {
        const { rating, comment, productId, vendorId } = req.body;
        const review = new Review({
            rating,
            comment,
            product: productId || null,
            vendor: vendorId || null
        });
        const savedReview = await review.save();

        // If review is for a product, add it to the product’s reviews array
        if (productId) {
            await Product.findByIdAndUpdate(productId, { $push: { reviews: savedReview._id } });
        }

        // If review is for a vendor, add it to the vendor’s reviews array
        if (vendorId) {
            await Vendor.findByIdAndUpdate(vendorId, { $push: { reviews: savedReview._id } });
        }

        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Public
exports.updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            { rating, comment },
            { new: true }
        );
        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Public
exports.deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
