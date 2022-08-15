import React from 'react'
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    
    return (
        <Router>
            <div className="App" >
                <Navbar />

                <Switch>
                    <AuthenticatedRoute path="/register">
                        <Register />
                    </AuthenticatedRoute>
                    <AuthenticatedRoute path="/login">
                        <Login />
                    </AuthenticatedRoute>
                    <ProtectedRoute path="/">
                        <Home />
                    </ProtectedRoute>
                </Switch>

            </div>
        </Router>
    )
}

export default App