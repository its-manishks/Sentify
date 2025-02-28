import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    // Track authentication status from localStorage
    const [userInfo, setUserInfo] = useState(localStorage.getItem('userInfo'));
    // State for dark mode
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setUserInfo(localStorage.getItem('userInfo'));
    }, []);

    useEffect(() => {
        // Toggle a dark-mode class on the body element
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const handleLogout = () => {
        // Remove both the user info and the analysis flag
        localStorage.removeItem('userInfo');
        localStorage.removeItem('analysisDone');
        setUserInfo(null);
        // Redirect to the Welcome page (or any desired public route)
        window.location.href = '/';
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <nav
            style={{
                padding: '10px 20px',
                backgroundColor: '#1e3c72',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <div>
                <Link
                    to="/"
                    style={{
                        fontSize: '24px',
                        color: '#fff',
                        textDecoration: 'none'
                    }}
                >
                    SENTIFY
                </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {userInfo && (
                    <Link
                        to="/dashboard"
                        style={{
                            color: '#fff',
                            textDecoration: 'none',
                            marginRight: '20px'
                        }}
                    >
                        Dashboard
                    </Link>
                )}
                {userInfo ? (
                    <button
                        onClick={handleLogout}
                        style={{
                            marginRight: '20px',
                            padding: '8px 16px',
                            backgroundColor: '#fff',
                            color: '#1e3c72',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link
                            to="/signup"
                            style={{
                                marginRight: '20px',
                                color: '#fff',
                                textDecoration: 'none'
                            }}
                        >
                            Sign Up
                        </Link>
                        <Link
                            to="/signin"
                            style={{
                                marginRight: '20px',
                                color: '#fff',
                                textDecoration: 'none'
                            }}
                        >
                            Sign In
                        </Link>
                    </>
                )}
                <button
                    onClick={toggleDarkMode}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#fff',
                        color: '#1e3c72',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
