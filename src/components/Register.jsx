import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { Navigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Check if the user is already logged in
    if (localStorage.getItem('token')) {
        return <Navigate to="/" />; // Redirect to home if logged in
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        try {
            await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            navigate('/login'); // Redirect to login on successful registration
        } catch (error) {
            console.error("Registration failed", error);
            setError(error.response.data.error || "Registration failed");
        }
    };

    return (
        <div className="auth-container">
            <h1>Register</h1>
            <br />
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="auth-input"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="auth-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="auth-input"
                />
                {error && <p className="error-message">{error}</p>} {/* Move error message here */}
                <button type="submit" className="auth-button">Register</button>
            </form>
            <br />
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Register;
