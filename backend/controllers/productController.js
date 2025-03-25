const axios = require('axios');
const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        // If reviews are stored inline as string, no need to populate
        const products = await Product.find();
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
        const product = await Product.findById(req.params.id);
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

// @desc    Get product analysis (production endpoint for ML integration)
// @route   GET /api/products/:id/analysis
// @access  Public
exports.getProductAnalysis = async (req, res) => {
    try {
      // Retrieve the product by ID (without populating reviews, since inline storage is used)
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Log the reviews field for debugging
      console.log("Product reviews field:", product.reviews, "Type:", typeof product.reviews);
  
      let combinedText = "";
  
      // Check if the reviews field is defined and is a non-empty string
      if (typeof product.reviews === 'string' && product.reviews.trim() !== "") {
        combinedText = product.reviews.trim();
      } 
      // If reviews is an array and not empty, handle accordingly
      else if (Array.isArray(product.reviews) && product.reviews.length > 0) {
        // If elements are strings, join them
        if (typeof product.reviews[0] === 'string') {
          combinedText = product.reviews.join(" ").trim();
        } else {
          // If elements are objects (with a comment field), join the comments
          combinedText = product.reviews
            .map(review => review.comment ? review.comment : "")
            .filter(Boolean)
            .join(" ")
            .trim();
        }
      } 
      // If reviews is undefined or empty, fall back to using the product description
      else if (product.description && product.description.trim() !== "") {
        console.log("Fallback: using product description as review text.");
        combinedText = product.description.trim();
      }
  
      console.log("Combined review text:", combinedText);
  
      // If still empty, return an error
      if (!combinedText) {
        return res.status(400).json({ message: "No reviews available for this product." });
      }
  
      // Choose a model for prediction (e.g., logistic_regression)
      const chosenModel = "logistic_regression";
  
      // Call the Python ML microservice with the combined review text
      const response = await axios.post('http://localhost:5001/predict', {
        text: combinedText,
        model: chosenModel
      });
  
      // Retrieve prediction from the ML service response
      const prediction = response.data.prediction;
      const analysis = {
        sentimentScore: prediction[0],  // Adjust mapping as needed
        summary: "ML model prediction returned based on product reviews.",
        probabilities: response.data.probabilities
      };
  
      res.json(analysis);
    } catch (error) {
      console.error("ML Prediction Error:", error);
      res.status(500).json({ error: 'Error in ML prediction' });
    }
  };
