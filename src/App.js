import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { reAuthenticate } from './redux/auth/action';
import { useSelector, useDispatch } from 'react-redux';

import Main from './components/pages/Main';
import Login from './components/pages/Login';
import Error from './components/pages/Error';

function App() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const { isLoggedIn } = auth;

    useEffect(() => {
        dispatch(reAuthenticate());
    }, [isLoggedIn, dispatch]);
    return (
        <>
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path='/' element={isLoggedIn ? <Main /> : <Login />} />
                    <Route path='login' element={!isLoggedIn ? <Main /> : <Login />} />
                    <Route path='*' element={<Error />}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
