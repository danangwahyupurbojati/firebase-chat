import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
    const { registerNewUser } = useAuth()
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: 'customer'
    });

    const { name, email, password, role } = data

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = e => {
        e.preventDefault();
        if (email || password || role || name) {
            registerNewUser(data);
            setData({
                name: "",
                email: "",
                password: "",
                role: 'customer'
            });
        }
    }

    return (
        <div className="auth-wrapper">
            <h3>Register</h3>
            <form onSubmit={submitHandler}>
                <div className="auth-input">
                    <label htmlFor="name">name</label>
                    <input 
                        type="name"
                        name="name"
                        id="name"
                        required
                        value={name}
                        onChange={handleChange}
                    />
                </div>
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
                <div className="auth-input">
                    <label htmlFor="role">Role</label>
                    <select name="role" id="role" value={role} onChange={handleChange}>
                        <option value="customer">customer</option>
                        <option value="admin">admin</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register