import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signin() {
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

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
            setMessage('Signin successful!');
            localStorage.setItem('userInfo', JSON.stringify(data));
            // Redirect to the protected dashboard route after signin
            navigate('/dashboard');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Signin failed');
        }
    };

    return (
        <div>
            <h2>Signin</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSignin}>
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
                <button type="submit">Sign In</button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
}

export default Signin;
