const axios = require('axios');
const Vendor = require('../models/Vendor');

// @desc    Get all vendors
// @route   GET /api/vendors
// @access  Public
exports.getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate('reviews').populate('products');
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get single vendor by ID
// @route   GET /api/vendors/:id
// @access  Public
exports.getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id).populate('reviews').populate('products');
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.json(vendor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Create a vendor
// @route   POST /api/vendors
// @access  Public
exports.createVendor = async (req, res) => {
    try {
        const { name, description } = req.body;
        const vendor = new Vendor({ name, description });
        const savedVendor = await vendor.save();
        res.status(201).json(savedVendor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update a vendor
// @route   PUT /api/vendors/:id
// @access  Public
exports.updateVendor = async (req, res) => {
    try {
        const { name, description } = req.body;
        const updatedVendor = await Vendor.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true }
        );
        res.json(updatedVendor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Delete a vendor
// @route   DELETE /api/vendors/:id
// @access  Public
exports.deleteVendor = async (req, res) => {
    try {
        await Vendor.findByIdAndDelete(req.params.id);
        res.json({ message: 'Vendor deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get vendor analysis (production endpoint for ML integration)
// @route   GET /api/vendors/:id/analysis
// @access  Public
exports.getVendorAnalysis = async (req, res) => {
    try {
      // Retrieve the vendor by ID without necessarily populating reviews (if stored inline)
      const vendor = await Vendor.findById(req.params.id);
      if (!vendor) {
        return res.status(404).json({ message: 'Vendor not found' });
      }
  
      // Log the reviews field for debugging
      console.log("Vendor reviews field:", vendor.reviews, "Type:", typeof vendor.reviews);
  
      let combinedText = "";
  
      // If reviews is a non-empty string, use it directly.
      if (typeof vendor.reviews === 'string' && vendor.reviews.trim() !== "") {
        combinedText = vendor.reviews.trim();
      }
      // If reviews is an array and not empty, handle accordingly.
      else if (Array.isArray(vendor.reviews) && vendor.reviews.length > 0) {
        // If the first element is a string, join all elements.
        if (typeof vendor.reviews[0] === 'string') {
          combinedText = vendor.reviews.join(" ").trim();
        } else {
          // Otherwise, assume each element is an object with a 'comment' field.
          combinedText = vendor.reviews
            .map(review => review.comment ? review.comment : "")
            .filter(Boolean)
            .join(" ")
            .trim();
        }
      }
      // Fallback: if no review text is available, optionally use the vendor's description.
      else if (vendor.description && vendor.description.trim() !== "") {
        console.log("Fallback: using vendor description as review text.");
        combinedText = vendor.description.trim();
      }
  
      console.log("Combined vendor review text:", combinedText);
  
      if (!combinedText) {
        return res.status(400).json({ message: "No reviews available for this vendor." });
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
        summary: "ML model prediction returned for vendor analysis.",
        probabilities: response.data.probabilities
      };
  
      res.json(analysis);
    } catch (error) {
      console.error("ML Prediction Error:", error);
      res.status(500).json({ error: 'Error in ML prediction' });
    }
  };
  
