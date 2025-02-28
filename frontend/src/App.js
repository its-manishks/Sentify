import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import ProductWrapped from './components/ProductWrapped';
import VendorWrapped from './components/VendorWrapped';
import CreateProduct from './components/CreateProduct';
import CreateVendor from './components/CreateVendor';
import ProductAnalysisPage from './components/ProductAnalysisPage';
import VendorAnalysisPage from './components/VendorAnalysisPage';
import ProductAnalysisOverview from './components/ProductAnalysisOverview'; // if available
import VendorAnalysisOverview from './components/VendorAnalysisOverview'; // if available
import WrappedReview from './components/WrappedReview';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/create-product" element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          } />
          <Route path="/create-vendor" element={
            <ProtectedRoute>
              <CreateVendor />
            </ProtectedRoute>
          } />
          <Route path="/view-product-analysis" element={
            <ProtectedRoute>
              <ProductAnalysisPage />
            </ProtectedRoute>
          } />
          <Route path="/view-vendor-analysis" element={
            <ProtectedRoute>
              <VendorAnalysisPage />
            </ProtectedRoute>
          } />
          {/* Existing analysis display pages */}
          <Route path="/product/:id" element={
            <ProtectedRoute>
              <ProductWrapped />
            </ProtectedRoute>
          } />
          <Route path="/vendor/:id" element={
            <ProtectedRoute>
              <VendorWrapped />
            </ProtectedRoute>
          } />
          {/* Wrapped Review page */}
          <Route path="/wrapped-review" element={
            <ProtectedRoute>
              <WrappedReview />
            </ProtectedRoute>
          } />
          {/* (Optional) Detailed Overview Pages */}
          <Route path="/analysis/product" element={
            <ProtectedRoute>
              <ProductAnalysisOverview />
            </ProtectedRoute>
          } />
          <Route path="/analysis/vendor" element={
            <ProtectedRoute>
              <VendorAnalysisOverview />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
