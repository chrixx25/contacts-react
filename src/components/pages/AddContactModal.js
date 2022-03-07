import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addContact } from '../../redux/actions/ContactActions';

const AddContactModal = ({ handleClose }) => {
    const initial_state = { first_name: '', last_name: '', middle_name: '', email: '', mobile_no: '' }
    const [contact, setContact] = useState(initial_state);
    const contacts = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'mobile_no')
            if (isNaN(value)) return false;

        setContact({ ...contact, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const new_contact = { ...contact, id: (contacts.length || 0) + 1 };
        const { first_name, last_name, email, mobile_no } = new_contact;

        if (first_name && last_name && email && mobile_no) {
            if (!!checkEmail(contact.email) || !!checkMobile(mobile_no))
                return false;

            dispatch(addContact(new_contact));
            setContact({ first_name: '', last_name: '', middle_name: '', email: '', mobile_no: '' });
            handleClose();
            toast.success("Contact added successfully!");
        }
    };
    const checkEmail = (email) => {
        const existing_contact = contacts.find(contact => contact.email === email);
        const is_valid_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!email)
            return 'Email Cannot be blank.';
        if (!is_valid_email.test(email))
            return 'Email is not valid';
        if (existing_contact)
            return `${existing_contact.email} is already exists.`;
        return false;
    }
    const checkMobile = (mobile) => {
        const existing_contact = contacts.find(contact => contact.mobile_no === mobile);

        if (!mobile)
            return 'Mobile Cannot be blank.';
        if (mobile.length !== 11)
            return 'Mobile No. must be 11 digits.';
        if (mobile.substring(0, 2) !== '09')
            return 'Mobile No. is invalid.';
        if (existing_contact)
            return `${existing_contact.mobile_no} is already exists.`;
        return false;
    }

    useEffect(() => {
        setContact(initial_state);
    }, []);

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
            <Form autoComplete="off" onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingFirstName"
                            type="text"
                            placeholder="First Name"
                            name='first_name'
                            value={contact.first_name}
                            onChange={handleChange}
                            isInvalid={!!!contact.first_name}
                        />
                        <Form.Control.Feedback type="invalid">
                            First Name cannot be blank.
                        </Form.Control.Feedback>
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
                            isInvalid={!!!contact.last_name}
                        />
                        <Form.Control.Feedback type="invalid">
                            Last Name cannot be blank.
                        </Form.Control.Feedback>
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
                            isInvalid={!!checkEmail(contact.email)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {checkEmail(contact.email)}
                        </Form.Control.Feedback>
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
                            isInvalid={!!checkMobile(contact.mobile_no)}
                            pattern="^[0-9]*$"
                            maxLength="11"
                        />
                        <Form.Text muted>
                            eg. 09971234567
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            {checkMobile(contact.mobile_no)}
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
