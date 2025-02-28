const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('reviews');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('reviews');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Public
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const product = new Product({ name, description, price });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price },
            { new: true }
        );
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get product analysis (dummy endpoint for ML integration)
// @route   GET /api/products/:id/analysis
// @access  Public
exports.getProductAnalysis = async (req, res) => {
    try {
        // Placeholder for ML analysis logic. Replace with your ML integration later.
        const analysis = {
            sentimentScore: Math.random().toFixed(2),
            summary: "This is a dummy product analysis summary.",
            priceTrend: "Price increased by 5% over the last year.",
            similarProducts: []  // Future integration: list of similar products.
        };

        res.json(analysis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
