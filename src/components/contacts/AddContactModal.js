import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addContact } from '../../redux/contacts/action';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getSchema } from '../../utils/schema';

const AddContactModal = ({ handleClose }) => {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(getSchema(contacts)),
        mode: "onChange",
        //reValidateMode: "onChange"
    });
    const onSubmit = data => {
        const new_contact = { ...data, id: (contacts.length || 0) + 1 };

        dispatch(addContact(new_contact));
        handleClose();
        toast.success("Contact added successfully!");
    };

    return (
        <Modal
            show={true}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Create Contact</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingFirstName"
                            type="text"
                            placeholder="First Name"
                            {...register("first_name")}
                            isInvalid={!!errors.first_name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.first_name?.message}
                        </Form.Control.Feedback>
                        <label htmlFor="floatingFirstName">First Name</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingLastName"
                            type="text"
                            placeholder="Last Name"
                            {...register("last_name")}
                            isInvalid={!!errors.last_name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.last_name?.message}
                        </Form.Control.Feedback>
                        <label htmlFor="floatingLastName">Last Name</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingMiddleName"
                            type="text"
                            placeholder="Middle Name"
                            {...register("middle_name")}
                            isInvalid={!!errors.middle_name}
                        />
                        <label htmlFor="floatingMiddleName">Middle Name</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingEmail"
                            type="email"
                            placeholder="name@example.com"
                            {...register("email")}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email?.message}
                        </Form.Control.Feedback>
                        <label htmlFor="floatingEmail">Email address</label>
                    </Form.Floating>
                    <Form.Floating>
                        <Form.Control
                            id="floatingMobile"
                            type="text"
                            placeholder="Mobile No."
                            {...register("mobile_no")}
                            isInvalid={!!errors.mobile_no}
                        />
                        <Form.Text muted>
                            eg. 09971234567
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            {errors.mobile_no?.message}
                        </Form.Control.Feedback>
                        <label htmlFor="floatingMobile">Mobile No.</label>
                    </Form.Floating>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="dark">Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddContactModal;
