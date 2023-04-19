import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../task';

import './task-list.css';

export default class TaskList extends Component {
  static defaultProps = {
    tasks: [],
    onComplete: () => {},
    onDeleted: () => {},
    onEditStart: () => {},
    onEditEnd: () => {},
  };

  static propTypes = {
    tasks: PropTypes.array,
    onComplete: PropTypes.func,
    onDeleted: PropTypes.func,
    onEditStart: PropTypes.func,
    onEditEnd: PropTypes.func,
  };

  render() {
    const { tasks, onComplete, onDeleted, onEditStart, onEditEnd, setTimerData } = this.props;
    const taskElements = tasks.map((task) => {
      return (
        <Task
          {...task}
          key={task.id}
          onComplete={() => onComplete(task.id)}
          onDeleted={() => onDeleted(task.id)}
          onEditStart={() => onEditStart(task.id)}
          onEditEnd={(...args) => onEditEnd(...args)}
          setTimerData={setTimerData}
        />
      );
    });

    return <ul className="todo-list">{taskElements}</ul>;
  }
}
