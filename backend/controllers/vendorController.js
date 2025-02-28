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

// @desc    Get vendor analysis (dummy endpoint for ML integration)
// @route   GET /api/vendors/:id/analysis
// @access  Public
exports.getVendorAnalysis = async (req, res) => {
    try {
        // Placeholder for ML analysis logic. Replace with your ML integration later.
        const analysis = {
            sentimentScore: Math.random().toFixed(2),
            summary: "This is a dummy vendor analysis summary.",
            productPerformance: "Overall product ratings are positive.",
            reviewHighlights: "Vendor responses are prompt."
        };

        res.json(analysis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
