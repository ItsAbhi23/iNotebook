import React, { useState, useContext } from 'react'
import ContextValue from '../context/notes/noteContext'

const AddNotes = () => { // Capitalize component names
  const { addNotes } = useContext(ContextValue); // Destructure addNote from context
  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const handleClick = (e) => {
    e.preventDefault(); // Prevent form from submitting
    addNotes(note.title,note.description,note.tag); // Add note to context using addNote function
    setNote({ title: '', description: '', tag: '' }); // Clear input fields
  }

  const onChange = (e) => { // Handle input changes
    setNote({
      ...note,
      [e.target.name]: e.target.value // Update note field based on input name
    });
  }

  return (
    <div>
      <div className='row my-3'>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddNotes
