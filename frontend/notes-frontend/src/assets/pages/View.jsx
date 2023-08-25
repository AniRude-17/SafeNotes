import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AskPass from '../popups/AskPass';
import MakeNote from '../popups/MakeNote';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';

const API_URL='http://localhost:8000';

const View = () => {
  const id=useParams().id;

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
    axios.post(API_URL+'/update', postData)
          .then(response => {
            setNoteContent(noteContent);
          })
          .catch(error => {
            console.error(error);
          });
    console.log("lol");
  }

  const checkNoteExistence = async () => {
    try {
      const response = await axios.get(`${API_URL}/view-existence?id=${id}`);
      if (response.data === 'YES') {
        setNoteExists(true);
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
    <div id="view">
      <div id="topArea">
        <div id="noteName">Note {id}</div>
        <input type="button" onClick={updateNote} id="updateNoteButton" className='react-button' value='SAVE'></input>
      </div>
      {noteExists ? <AskPass Id={id} setNoteContent={setNoteContent} /> : <MakeNote Id={id} setNoteContent={setNoteContent}/>}
      <div id="noteArea">
        <textarea value={noteContent} id="noteText" onChange={handleNoteEdit} />
      </div>
    </div>
  );
};

export default View;
