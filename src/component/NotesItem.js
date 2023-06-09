import React, { useContext } from 'react';
import ContextValue from '../context/notes/noteContext';

const NotesItem = (props) => {
  const { deleteNotes } = useContext(ContextValue);
  const { note, updateNote } = props;
  
  return (
    <div className='col-md-3'>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tag}</p>
          <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNotes(note._id) }}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i> {/* corrected to use the updateNote function */}
        </div>
      </div>
    </div>
  );
};

export default NotesItem;

