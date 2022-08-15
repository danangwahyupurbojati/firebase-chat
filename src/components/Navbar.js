import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
    const { user, signOut } = useAuth();
    console.log('userNavbar', user);
    return (
        <nav>
            <div>
                <Link to="/">Home</Link>
            </div>
            {
                !user ? (
                    <ul>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                ) : (
                    <div className="nav-user">
                        <p>{user.email}</p>
                        <button onClick={signOut}>
                            Logout
                        </button>
                    </div>
                )
            }
        </nav>
    )
}

export default Navbar