import React from 'react';
import { Navigate } from 'react-router-dom';
//import { getToken } from '../utils/token';

const PrivateRoute = ({ Component, IsLogin }) => {
    return IsLogin ? <Component /> : <Navigate to="/login" />
}

export default PrivateRoute;