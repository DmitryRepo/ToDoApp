import React from "react";
import Task from "../task";

import "./task-list.css";

const TaskList = ({ tasks, onSwitch, onDelete }) => {
  const taskElements = tasks.map((item) => {
    return (
      <Task
        {...item}
        key={item.id}
        onSwitch={() => onSwitch(item.id)}
        onDelete={() => onDelete(item.id)}
      />
    );
  });

  return <ul className="todo-list">{taskElements}</ul>;
};

export default TaskList;
