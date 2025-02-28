import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
    return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
            <h1>Welcome to SENTIFY</h1>
            <p>
                SENTIFY is a revolutionary platform that analyzes product and vendor reviews in a "Spotify Wrapped" style.
                Using advanced semantic analysis, it provides insights into sentiment, price trends, and performance metrics.
            </p>
            <p>
                To experience the full power of SENTIFY, please sign up or sign in.
            </p>
            <div style={{ marginTop: '20px' }}>
                <Link
                    to="/signup"
                    style={{ marginRight: '20px', textDecoration: 'none', padding: '10px 20px', background: '#1e3c72', color: '#fff', borderRadius: '4px' }}
                >
                    Sign Up
                </Link>
                <Link
                    to="/signin"
                    style={{ textDecoration: 'none', padding: '10px 20px', background: '#1e3c72', color: '#fff', borderRadius: '4px' }}
                >
                    Sign In
                </Link>
            </div>
        </div>
    );
}

export default Welcome;
