import React from 'react';

import Task from '../Task/Task';
import './TaskList.css';

const TaskList = (props) => {
  const { remove, tasks, setComletedTodos, filter } = props;

  const filteredTasks = filterTasks(tasks, filter);

  const taskElems = filteredTasks.map((task) => {
    const taskCompleted = task.completed;

    return (
      <Task
        remove={remove}
        taskCompleted={taskCompleted}
        setComletedTodos={setComletedTodos}
        {...task}
        key={task.id}
      />
    );
  });

  return <ul className="todo-list">{taskElems}</ul>;
};

const filterTasks = (tasks, filter) => {
  if (filter === 'all') {
    return tasks;
  }

  if (filter === 'completed') {
    return tasks.filter((task) => {
      if (task.completed === true) return task;
    });
  }
  if (filter === 'active') {
    return tasks.filter((task) => {
      if (task.completed === false) return task;
    });
  }
};

export default TaskList;
