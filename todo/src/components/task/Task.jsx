import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

import Timer from '../Timer/Timer';

import EditField from './EditField';
import './Task.css';

const Task = (props) => {
  const { remove, taskCompleted, setComletedTodos, id, label, time } = props;

  const taskDate = new Date();

  const [editing, setEditing] = useState(false);
  const [taskLabel, setTaskLabel] = useState(label || '');
  const [formattedCreateTime, setFormattedCreateTime] = useState(
    `created ${formatDistanceToNow(taskDate)} ago`
  );

  const classNames = [taskCompleted ? 'completed' : '', editing ? 'editing' : ''].join(' ');

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedCreateTime(`created ${formatDistanceToNow(taskDate)} ago`);
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onCompleteToggle = () => {
    if (taskCompleted === true) {
      setComletedTodos(false, id);
    } else if (taskCompleted === false) {
      setComletedTodos(true, id);
    }
  };

  const onTaskEdit = (event) => setTaskLabel(event.target.value);
  const onTaskEscapeEdit = (event) => {
    if (event.code === 'Escape') {
      setEditing((editing) => !editing);
      setTaskLabel(label);
    }
  };
  const onEditEnd = () => setEditing((editing) => !editing);
  const removeTask = () => remove(id);

  return (
    <li className={classNames} key={id}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          id={`${id}__check`}
          onChange={onCompleteToggle}
          checked={taskCompleted}
        />
        <label htmlFor={`${id}__check`}>
          <span className="description">{taskLabel}</span>
          <Timer time={time} onComplete={taskCompleted} />
          <span className="created">{formattedCreateTime}</span>
        </label>
        <button className="icon icon-edit" onClick={() => setEditing(true)} />
        <button className="icon icon-destroy" onClick={() => removeTask(id)} />
      </div>

      <EditField
        editing={editing}
        onTaskEdit={onTaskEdit}
        onTaskEscapeEdit={onTaskEscapeEdit}
        onEditEnd={onEditEnd}
        label={taskLabel}
        id={id}
      />
    </li>
  );
};
export default Task;
