import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios';
import { URL } from '../keys';
import FetchError from '../components/FetchError';

const Signup = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            navigate('/home');
        }
    })

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [authError, setAuthError] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    const url = URL.auth;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username.length < 3) return setAuthError('Username must be atleast 3 characters long');
        if (password.length < 6) return setAuthError('Password must be aleast 6 characters long');
        if (password !== confirmPassword) return setAuthError('Passwords don\'t match');

        const user = {
            username,
            password
        };

        console.log(user);
        try {
            setLoading(true);
            const response = await axios.post(url + '/signup', user);
            if (response) setLoading(false);
            
            if (response.data.success && response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                return navigate('/');
            }
            
            if (response.data.error) {
                setAuthError(response.data.error);
            }
            
            if (response.data.serverError) {
                setFetchError(response.data.serverError);
            }
        
        } catch (error) {
            setError('Oops!! Something Went Wrong!');
        }
    }

    if (fetchError) return <FetchError fetchError={fetchError} />

  return (
    <div className="auth">
        
        <h1 className="auth-head">SignUp</h1>

        { loading && <p className="auth-loading">Loading...</p>}
        { error && <p className="auth-error">{error}</p>}
        { authError && <p className="auth-autherror">{authError}</p>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-fields">
                <label htmlFor="username">Username</label>
                <input 
                    type="text"
                    id="username"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="input-fields">
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="input-fields">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input 
                    type="password"
                    id="confirm-password"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button type="submit">Signup</button>
            <div className="auth-links">
                <p>Already have an account? <Link to="/">Login</Link></p>
            </div>
        </form>
        
    </div>
  )
}

export default Signup;