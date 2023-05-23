import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AskPass from '../popups/AskPass';
import MakeNote from '../popups/MakeNote';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';

const View = () => {
  const id=useParams().id;
  console.log(id);

  const [noteContent, setNoteContent] = useState(id);
  const [noteExists, setNoteExists] = useState(false);

  const handleNoteEdit = (event) => {
    setNoteContent(event.target.value);
  };

  const updateNote = () => {
    const postData = {
      id: id,
      content: noteContent
    };
    axios.post('http://localhost:8000/update', postData)
          .then(response => {
            setNoteContent(noteContent);
            // Handle the response as needed
          })
          .catch(error => {
            console.error(error);
            // Handle the error as needed
          });
    console.log("lol");
  }

  const checkNoteExistence = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/view-existence?id=${id}`);
      if (response.data === 'YES') {
        setNoteExists(true);
        console.log('Note exists');
      } else {
        setNoteExists(false);
        console.log('Note does not exist');
      }
    } catch (error) {
      console.log('An error occurred');
      console.error(error);
    }
  };

  useEffect(() => {
    checkNoteExistence();
  }, [id]);




  return (
    <div>
      <h3>VIEW NOTE</h3>
      {/* <AskPass Id={id} setNoteContent={setNoteContent} /> */}
      {/* <MakeNote Id={id} setNoteContent={setNoteContent}/> */}
      {noteExists ? <AskPass Id={id} setNoteContent={setNoteContent} /> : <MakeNote Id={id} setNoteContent={setNoteContent}/>}
      <textarea value={noteContent} id="noteText" onChange={handleNoteEdit} />
      <Button onClick={updateNote}> Update Note </Button>
    </div>
  );
};

export default View;
