import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const AskPass = ({ Id, setNoteContent }) => {
  const [show, setShow] = useState(true);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setPassword(event.target.value);
    setErrorMessage(''); // Clear error message on password change
  };

  const handlePassSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8000/view-full?id=${Id}&password=${password}`)
      .then((response) => {
        const noteContent = response.data;
        if(noteContent==="WRONG PASSWORD")
          setErrorMessage('Wrong Password');
        else {
          setNoteContent(noteContent);
          setShow(false);
        }
      })
      .catch((error) => {
        setErrorMessage('Wrong password. Please try again.'); // Set error message on incorrect password
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} animation={false}>
        <Modal.Header>
          <Modal.Title>Note Protected</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" id="passInput">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
          </Form>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePassSubmit} onTouchStart={handlePassSubmit} className='react-button'>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AskPass;
