import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthenticatedRoute = ({children, ...rest}) => {
    const { user } = useAuth();
    return (
        <Route {...rest}>
            {!user ? children : <Redirect to="/" />}
        </Route>
    )
}

export default AuthenticatedRoute;