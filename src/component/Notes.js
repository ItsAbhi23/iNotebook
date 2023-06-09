import React, { useContext, useEffect, useState, useRef } from 'react';
import NotesItem from './NotesItem';
import AddNotes from './addNotes';
import NoteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ etitle: '', edescription: '', etag: '' });
  let navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
    }else{
      alert("please login!!");
      navigate('/login');
    }
  }, []);

  const ref = useRef(null);
  const refclose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    console.log("currentNote   ", currentNote)
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    editNote(note.id, note.etitle, note.edescription, note.etag);
    setNote({ etitle: '', edescription: '', etag: '' });
    refclose.current.click();
  };

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <AddNotes />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle}  onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Description</label>
            <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Tag</label>
            <input type="text" className="form-control" id="etag" name='etag' value={note.etag}  onChange={onChange} />
          </div>

        </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refclose}className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button"  onClick={handleClick} className="btn btn-primary">Update Notes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Notes</h2>
        {/* {notes.map((note) => {
          return <NotesItem key={note._id} updateNote={updateNote} note={note} />;
        })} */}
        {Array.isArray(notes) && notes.map((note) => {
  return <NotesItem key={note._id} updateNote={updateNote} note={note} />;
})}

      </div>
    </>
  );
};

export default Notes;
