import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const { loginUser } = useAuth()
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = data

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = e => {
        e.preventDefault();
        if (email || password) {
            loginUser(data);
            setData({
                email: "",
                password: "",
            });
        }
    }
    return (
        <div className="auth-wrapper">
            <h3>login</h3>
            <form className="auth-form" onSubmit={submitHandler}>
                <div className="auth-input">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div className="auth-input">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        required
                        name="password"
                        id="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login