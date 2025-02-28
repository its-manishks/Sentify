import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const userInfo = localStorage.getItem('userInfo');
    // If not authenticated, redirect to the Sign In page.
    return userInfo ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;
