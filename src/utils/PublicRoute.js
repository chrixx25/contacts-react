import React from 'react';
import { Navigate } from 'react-router-dom';
//import { getToken } from '../utils/token';

const PublicRoute = ({ Component, IsLogin }) => {
    return !IsLogin ? <Component /> : <Navigate to="/" />
}

export default PublicRoute;