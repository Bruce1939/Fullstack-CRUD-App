import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../keys';
import FetchError from '../components/FetchError';

const Login = () => {
   
    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            navigate('/home');
        }
    })

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [authError, setAuthError] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    const url = URL.auth;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user = {
            username,
            password
        };
        
        try {
            setLoading(true);
            const response = await axios.post(url + '/login', user);
            if (response) setLoading(false);
            
            if (response.data.success && response.data.token && response.data.user) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('user', JSON.stringify(response.data.user));
                return navigate('/home');
            }
            
            if (response.data.error) {
                setAuthError(response.data.error);
            }
            
            if (response.data.serverError) {
                setFetchError(response.data.serverError);
            }

        } catch (error) {
            setError('Oops!! Something Went Wrong');
        }
    }

    if (fetchError) return <FetchError fetchError={fetchError} />

  return (
    <div className="auth"> 

        <h1 className="auth-head">Login</h1>

        { loading && <p className="auth-loading">Loading...</p>}
        { error && <p className="auth-error">{error}</p>}
        { authError && <p className="auth-autherror">{authError}</p>}

        <form  className="auth-form" onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
            <div className="auth-links">
                <p>Don't have an account? <Link to="/signup">Signup</Link></p>
            </div>
        </form>
    </div>
  )
}

export default Login;