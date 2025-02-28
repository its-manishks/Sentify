import React from 'react';

function AnalysisPlaceholder({ title, content }) {
    return (
        <div>
            <h3>{title}</h3>
            <p>{content || "No data available."}</p>
        </div>
    );
}

export default AnalysisPlaceholder;
