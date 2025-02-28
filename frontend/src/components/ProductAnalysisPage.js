import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductAnalysisPage() {
    const [productId, setProductId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (productId.trim()) {
            // Set flag to indicate analysis is done
            localStorage.setItem('analysisDone', 'true');
            // Navigate to the product analysis display page (existing route using ProductWrapped)
            navigate(`/product/${productId.trim()}`);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>View Product Analysis</h2>
            <p>Enter a product ID to view its analysis:</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    style={{ padding: '10px', marginRight: '10px' }}
                />
                <button type="submit" style={{ padding: '10px 20px' }}>
                    View Analysis
                </button>
            </form>
        </div>
    );
}

export default ProductAnalysisPage;
