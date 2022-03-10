import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { reAuthenticate } from './redux/auth/action';
import { logout } from './redux/auth/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from './utils/token';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

import Main from './components/pages/Main';
import Login from './components/pages/Login';
import Error from './components/pages/Error';

function App() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const { isLoggedIn } = auth;

    useEffect(() => {
        if (!getToken()) {
            dispatch(logout());
            return false;
        }
        dispatch(reAuthenticate());
    }, [isLoggedIn, dispatch]);
    return (
        <>
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path='/' element={<PrivateRoute IsLoggedIn={isLoggedIn} Component={Main} />} />
                    <Route path='/login' element={<PublicRoute IsLoggedIn={isLoggedIn} Component={Login} />} />
                    <Route path='*' element={<Error />}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
