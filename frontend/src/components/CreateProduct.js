import React, { useState } from 'react';
import axios from 'axios';

function CreateProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            setMessage('Product name is required.');
            return;
        }
        axios.post('http://localhost:5000/api/products', { name, description, price })
            .then(response => {
                setMessage('Product created successfully with ID: ' + response.data._id);
                setName('');
                setDescription('');
                setPrice('');
            })
            .catch(err => {
                setMessage('Error creating product: ' + err.message);
            });
    };

    return (
        <div>
            <h2>Create Product</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        placeholder="Enter product name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        placeholder="Enter product description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        placeholder="Enter product price"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
}

export default CreateProduct;
