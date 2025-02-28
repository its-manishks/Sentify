import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // If the user is already logged in, redirect them to the dashboard
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
            setMessage('Signup successful!');
            localStorage.setItem('userInfo', JSON.stringify(data));
            // Redirect to the protected dashboard route after signup
            navigate('/dashboard');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSignup}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <Link to="/signin">Sign In</Link>
            </p>
        </div>
    );
}

export default Signup;
