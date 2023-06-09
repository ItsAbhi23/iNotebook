import React, { useState } from 'react';
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:4000";
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

  // Get notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error(error);
    }
  };

  // Edit notes
  const editNote = async (id, title, description, tag) => {
    console.log(id, title, description, tag);
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
      const json = await response.json();
      console.log("json", json)
      if (json.success) {
        const updatedNotes = notes.map(note => {
          if (note._id === id) {
            note.title = title;
            note.description = description;
            note.tag = tag;
          }
          console.log("updatedNotes  ",note)
          return note;
        });

        console.log("updatedNotes  ", updatedNotes)
        setNotes(updatedNotes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Add notes
  const addNotes = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
      const json = await response.json();
      if (json.success) {
        const newNote = {
          "_id": json.note._id,
          "user": json.note.user,
          "title": title,
          "description": description,
          "tag": tag,
          "date": json.note.date,
          "__v": 0
        };
        setNotes([...notes, newNote]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete notes
  const deleteNotes = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        }
      });
      const json = await response.json();
      if (json.success) {
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNotes, editNote, deleteNotes, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

