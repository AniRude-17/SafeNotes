import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AskPass from '../popups/AskPass';
import MakeNote from '../popups/MakeNote';
import axios from 'axios';



const View = () => {
  const id=useParams().id;
  console.log(id);

  const [noteContent, setNoteContent] = useState(id);

  const handleNoteEdit = (event) => {
    setNoteContent(event.target.value);
  };
  return (
    <div>
      <h3>VIEW NOTE</h3>
      {/* <AskPass Id={id} setNoteContent={setNoteContent} /> */}
      <MakeNote Id={id} setNoteContent={setNoteContent}/>
      <input type="text" value={noteContent} id="noteText" onChange={handleNoteEdit} />
    </div>
  );
};

export default View;
