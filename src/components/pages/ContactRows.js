import React from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

const ContactRows = ({ handleShow }) => {

    return (
        <tr>
            <td>1</td>
            <td>
                <Button className="me-1 p-0" variant="primary" size="sm" onClick={() => handleShow()}>
                    <FaPencilAlt className='m-1' />
                </Button>
                <Button className="me-1 p-0" variant="danger" size="sm">
                    <FaTrash className='m-1' />
                </Button>
            </td>
            <td>Christopher C. Delos Reyes</td>
            <td>delosreyeschris77@gmail.com</td>
            <td>0997-268-6236</td>
        </tr>
    )
};

export default ContactRows;
