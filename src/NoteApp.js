import React, { useState, useEffect } from 'react';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    storedNotes && setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);
  const addNote = e => {
    e.preventDefault();
    setNotes([...notes, { title, body }]);
    setTitle('');
    setBody('');
  };

  const remove = title => {
    setNotes(notes.filter(notes => notes.title !== title));
  };
  return (
    <div>
      <h1>note</h1>
      <p>Add note</p>
      <form onSubmit={addNote}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea value={body} onChange={e => setBody(e.target.value)} />
        <button>Add note</button>
      </form>
      <ul>
        {notes.map(({ title, body }) => (
          <Note key={title} title={title} body={body} remove={remove} />
        ))}
      </ul>
    </div>
  );
};

const Note = ({ title, body, remove }) => {
  useEffect(() => {
    console.log('kj');
    return () => {
      console.log('Cleaning up');
    };
  }, []);
  return (
    <li>
      {title} <button onClick={() => remove(title)}>x</button>
      <p>{body}</p>
    </li>
  );
};

export default NoteApp;
