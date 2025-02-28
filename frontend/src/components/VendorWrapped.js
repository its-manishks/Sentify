import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function VendorWrapped() {
    const { id } = useParams();
    const [analysis, setAnalysis] = useState(null);
    const [vendor, setVendor] = useState(null);

    useEffect(() => {
        // Fetch vendor details
        axios.get(`http://localhost:5000/api/vendors/${id}`)
            .then(res => {
                setVendor(res.data);
            })
            .catch(err => console.error(err));

        // Fetch vendor analysis (dummy data for now)
        axios.get(`http://localhost:5000/api/vendors/${id}/analysis`)
            .then(res => {
                setAnalysis(res.data);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (!vendor || !analysis) {
        return <div>Loading analysis...</div>;
    }

    return (
        <div>
            <h2>Vendor Analysis: {vendor.name}</h2>
            <p>{vendor.description}</p>
            <h3>Review Analysis</h3>
            <p>Sentiment Score: {analysis.sentimentScore}</p>
            <p>Summary: {analysis.summary}</p>
            <h3>Product Performance</h3>
            <p>{analysis.productPerformance}</p>
            <h3>Review Highlights</h3>
            <p>{analysis.reviewHighlights}</p>
        </div>
    );
}

export default VendorWrapped;
