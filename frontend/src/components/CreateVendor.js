import React, { useState } from 'react';
import axios from 'axios';

function CreateVendor() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            setMessage('Vendor name is required.');
            return;
        }
        axios.post('http://localhost:5000/api/vendors', { name, description })
            .then(response => {
                setMessage('Vendor created successfully with ID: ' + response.data._id);
                setName('');
                setDescription('');
            })
            .catch(err => {
                setMessage('Error creating vendor: ' + err.message);
            });
    };

    return (
        <div>
            <h2>Create Vendor</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        placeholder="Enter vendor name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        placeholder="Enter vendor description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Create Vendor</button>
            </form>
        </div>
    );
}

export default CreateVendor;
