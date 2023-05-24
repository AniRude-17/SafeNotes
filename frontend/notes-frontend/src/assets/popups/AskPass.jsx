import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const AskPass = ({ Id, setNoteContent }) => {

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [password, setPassword] = useState('');
  
  
    const handleChange = (event) => {
      setPassword(event.target.value);
      console.log(event.target.value)
    };
  
    const handlePassSubmit = (e) => {
        e.preventDefault();
        axios
          .get(`http://localhost:8000/view-full?id=${Id}&password=${password}`)
          .then(response => {
            console.log(response.data);
            const noteContent = response.data;
            setNoteContent(noteContent);

            setShow(false);
          })
          .catch(error => {
            setNoteContent("WRONG PASSWORD SORRY");
            setShow(false);
          });
      }
      
  
  return (
    <>
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Note Exists Enter Passowrd</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" id="passInput">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="pupu Password"
              value={password}
              onChange={handleChange}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handlePassSubmit} onTouchStart={handlePassSubmit}>
          Submiddt
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default AskPass