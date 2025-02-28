import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    // Retrieve user info from localStorage (stored as JSON during signup/signin)
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const navigate = useNavigate();
    // Check if analysis has been done (set in the analysis pages)
    const analysisDone = localStorage.getItem('analysisDone') === 'true';

    return (
        <div style={{ padding: '20px', minHeight: 'calc(100vh - 80px)' }}>
            {/* Introduction Section */}
            <section style={{ marginBottom: '40px' }}>
                <h2>
                    Welcome to SENTIFY Dashboard{userInfo.name ? `, ${userInfo.name}` : ''}!
                </h2>
                <p>
                    SENTIFY is your one-stop solution for detailed analysis of product and vendor reviews,
                    helping you make informed decisions just like your favorite e-commerce platforms.
                </p>
            </section>

            {/* Four buttons in a row */}
            <section style={{ marginBottom: '40px' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                        gap: '20px'
                    }}
                >
                    <button onClick={() => navigate('/create-product')} style={buttonStyle}>
                        Create a Product
                    </button>
                    <button onClick={() => navigate('/create-vendor')} style={buttonStyle}>
                        Create a Vendor
                    </button>
                    <button onClick={() => navigate('/view-product-analysis')} style={buttonStyle}>
                        View Product Analysis
                    </button>
                    <button onClick={() => navigate('/view-vendor-analysis')} style={buttonStyle}>
                        View Vendor Analysis
                    </button>
                </div>
            </section>

            {/* Conditional Wrapped Review button */}
            {analysisDone && (
                <section style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <button
                        onClick={() => navigate('/wrapped-review')}
                        style={{ ...buttonStyle, padding: '12px 24px' }}
                    >
                        View Wrapped Review
                    </button>
                </section>
            )}

            {/* How to Use It Section */}
            <section style={{ marginBottom: '40px' }}>
                <h3>How to Use SENTIFY</h3>
                <p>
                    1. Create products or vendors using the buttons above.<br />
                    2. View detailed analysis of product or vendor reviews by entering their IDs on the
                    respective analysis pages.<br />
                    3. Once the analysis is completed, the option to view your Wrapped Review will appear.<br />
                    4. Use these insights to make smarter purchasing decisions.
                </p>
            </section>

            {/* Footer */}
            <footer
                style={{
                    textAlign: 'center',
                    padding: '20px 0',
                    borderTop: '1px solid #ccc'
                }}
            >
                &copy; {new Date().getFullYear()} SENTIFY. All rights reserved.
            </footer>
        </div>
    );
}

const buttonStyle = {
    padding: '15px 25px',
    backgroundColor: '#1e3c72',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px'
};

export default Dashboard;
