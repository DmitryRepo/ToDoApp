import React, { useEffect, useState } from 'react';

import './Footer.css';

import TaskFilter from '../TasksFilter/TasksFilter';

const Footer = (props) => {
  const { changeFilter, tasks, onComplete } = props;

  const [todoCount, setTodoCount] = useState(0);

  useEffect(() => {
    const count = tasks.filter((element) => !element.completed).length;

    setTodoCount(count);
  }, [tasks]);

  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TaskFilter changeFilter={changeFilter} />
      <button className="clear-completed" onClick={onComplete}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
