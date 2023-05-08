import React, { useState } from 'react';

import './NewTaskForm.css';

const NewTaskForm = ({ saveTodo }) => {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const [id, setId] = useState(100);

  const submitHandler = (event) => {
    event.preventDefault();
    const time = Number(min) * 60 + Number(sec);
    saveTodo({ id, label, time });
    setId(id + 1);
    setLabel('');
    setMin('');
    setSec('');
  };

  return (
    <form className={'new-todo-form'} onSubmit={submitHandler}>
      <input
        className="new-todo"
        placeholder="Task"
        onChange={(event) => setLabel(event.target.value)}
        value={label}
        autoFocus
        required
        pattern="^[^\s]+(\s.*)?$"
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={(event) => setMin(event.target.value)}
        type={'number'}
        value={min}
        min="0"
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={(event) => setSec(event.target.value)}
        type={'number'}
        value={sec}
        min="0"
        max="59"
      />
      <button type={'submit'}></button>
    </form>
  );
};

export default NewTaskForm;
