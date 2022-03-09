import React from 'react';
import { Button, Form, Spinner, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/schema';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/auth/action'
import { useSelector } from 'react-redux';

import '../../assets/css/login.min.css';

const Login = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, isLoading, error } = auth;
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onChange",
        //reValidateMode: "onChange"
    });
    const onSubmit = data => {
        dispatch(login(data));

        if (isLoggedIn)
            navigate('/');
    };

    return (
        <main>
            <div className="d-flex justify-content-center align-items-center">
                <div className="login-container rounded shadow">
                    <div className="bg-dark bg-gradient text-center text-white p-2 rounded-top align-middle">
                        <h4>CONTACT MANAGER</h4>
                    </div>
                    <Form className="m-1 p-3" onSubmit={handleSubmit(onSubmit)}>
                        {error &&
                            <Alert variant="danger" className="p-2 alert-dismissible show text-center">
                                <small>{error}</small>
                            </Alert>
                        }
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingUsername"
                                type="text"
                                placeholder="Username"
                                {...register("username")}
                                isInvalid={!!errors.username}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username?.message}
                            </Form.Control.Feedback>
                            <label htmlFor="floatingUsername">Username</label>
                        </Form.Floating>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingPassword"
                                type="password"
                                placeholder="Password"
                                {...register("password")}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password?.message}
                            </Form.Control.Feedback>
                            <label htmlFor="floatingPassword">Password</label>
                        </Form.Floating>
                        <Button type="submit" variant="primary" className="btn btn-dark w-100 mt-3 p-3" disabled={isLoading}>
                            {isLoading && <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />} LOGIN
                        </Button>
                    </Form>
                </div>
            </div>
        </main>

    )
}

export default Login