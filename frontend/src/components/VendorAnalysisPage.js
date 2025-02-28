import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VendorAnalysisPage() {
    const [vendorId, setVendorId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (vendorId.trim()) {
            localStorage.setItem('analysisDone', 'true');
            navigate(`/vendor/${vendorId.trim()}`);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>View Vendor Analysis</h2>
            <p>Enter a vendor ID to view its analysis:</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Vendor ID"
                    value={vendorId}
                    onChange={(e) => setVendorId(e.target.value)}
                    style={{ padding: '10px', marginRight: '10px' }}
                />
                <button type="submit" style={{ padding: '10px 20px' }}>
                    View Analysis
                </button>
            </form>
        </div>
    );
}

export default VendorAnalysisPage;
