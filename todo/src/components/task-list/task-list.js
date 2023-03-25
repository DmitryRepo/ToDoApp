import React, { Component } from "react";
import Task from "../task";

import "./task-list.css";

export default class TaskList extends Component {
  render() {
    const { tasks, onComplete, onDeleted, onEditStart, onEditEnd } = this.props;
    const taskElements = tasks.map((task) => {
      return (
        <Task
          {...task}
          key={task.id}
          onComplete={() => onComplete(task.id)}
          onDeleted={() => onDeleted(task.id)}
          onEditStart={() => onEditStart(task.id)}
          onEditEnd={(...args) => onEditEnd(...args)}
        />
      );
    });

    return <ul className="todo-list">{taskElements}</ul>;
  }
}
