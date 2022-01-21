import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const EditContactModal = ({ show, handleClose, contact_id }) => {
    const [contact, setContact] = useState({ first_name: '', last_name: '', middle_name: '', email: '', mobile_no: '' });
    const contacts = useSelector((state) => state);
    const current_contact = contacts.find(contact => contact.id === parseInt(contact_id));
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setContact({ ...contact, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { first_name, last_name, middle_name, email, mobile_no } = contact;

        if (first_name && last_name && middle_name && email && mobile_no) {
            const new_contact = contact;

            dispatch({ type: 'UPDATE_CONTACT', payload: new_contact });
            setContact({ first_name: '', last_name: '', middle_name: '', email: '', mobile_no: '' });
            handleClose();
            toast.success("Contact updated successfully!");
        }
    };

    useEffect(() => {
        if (current_contact)
            setContact(current_contact)
    }, [current_contact]);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Contact</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingFirstName"
                            type="text"
                            placeholder="First Name"
                            name='first_name'
                            value={contact.first_name}
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingFirstName">First Name</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingLastName"
                            type="text"
                            placeholder="Last Name"
                            name='last_name'
                            value={contact.last_name}
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingLastName">Last Name</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingMiddleName"
                            type="text"
                            placeholder="Middle Name"
                            name='middle_name'
                            value={contact.middle_name}
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingMiddleName">Middle Name</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingEmail"
                            type="email"
                            placeholder="name@example.com"
                            name='email'
                            value={contact.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingEmail">Email address</label>
                    </Form.Floating>
                    <Form.Floating>
                        <Form.Control
                            id="floatingMobile"
                            type="text"
                            placeholder="Mobile No."
                            name="mobile_no"
                            value={contact.mobile_no}
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingMobile">Mobile No.</label>
                    </Form.Floating>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="dark">Save</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default EditContactModal;
