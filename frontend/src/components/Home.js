import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [productId, setProductId] = useState('');
    const [vendorId, setVendorId] = useState('');
    const navigate = useNavigate();

    const handleProductSubmit = (e) => {
        e.preventDefault();
        if (productId) {
            navigate(`/product/${productId}`);
        }
    };

    const handleVendorSubmit = (e) => {
        e.preventDefault();
        if (vendorId) {
            navigate(`/vendor/${vendorId}`);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Welcome to SENTIFY</h2>
                <p>Analyze product and vendor reviews in a "Spotify Wrapped" style.</p>
            </div>

            <div className="form-section">
                <h3>Product Analysis</h3>
                <form onSubmit={handleProductSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Product ID"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                    />
                    <button type="submit">View Product Analysis</button>
                </form>
            </div>

            <div className="form-section">
                <h3>Vendor Analysis</h3>
                <form onSubmit={handleVendorSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Vendor ID"
                        value={vendorId}
                        onChange={(e) => setVendorId(e.target.value)}
                    />
                    <button type="submit">View Vendor Analysis</button>
                </form>
            </div>
        </div>
    );
}

export default Home;
