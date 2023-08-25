import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const API_URL='http://localhost:8000';

const MakeNote = ({Id,setNoteContent}) => {

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [password, setPassword] = useState('');
    const handleChange = (event) => {
        setPassword(event.target.value);
        console.log(event.target.value)
      };

    const handlePass = () =>{
        console.log(Id);
        const postData = {
            id: Id,
            passhash: password,
            content: " "
          };
          axios.post(API_URL+'/add', postData)
          .then(response => {
            setShow(false);
            setNoteContent("The Note is Currently Empty :(");
          })
          .catch(error => {
            setShow(false);
            console.error(error);
          });
    }

  return (
    <div>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} animation={false} size='sm'>
      <Modal.Header>
        <Modal.Title>Create Note
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" id="passInput">
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="pupu Password"
               value={password}
               onChange={handleChange}
               type="password"
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handlePass} className='react-button'>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default MakeNote