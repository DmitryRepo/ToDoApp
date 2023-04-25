import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './task.css';

export default class Task extends Component {
  static defaultProps = {
    completed: false,
    editing: false,
    id: 100,
    description: '',
    createTime: new Date(),
    onComplete: () => {},
    onEditStart: () => {},
    onDeleted: () => {},
  };

  static propTypes = {
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    id: PropTypes.number,
    description: PropTypes.string,
    createTime: PropTypes.instanceOf(Date),
    onComplete: PropTypes.func,
    onEditStart: PropTypes.func,
    onDeleted: PropTypes.func,
  };

  state = {
    taskLabel: this.props.description,
    timer: false,
    timerCount: this.props.timerCountData,
  };

  onTaskEdit = (event) => {
    this.setState({
      taskLabel: event.target.value,
    });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    const { onEditEnd, id } = this.props;
    const { taskLabel } = this.state;
    onEditEnd(taskLabel, id);
  };

  onEscape(event) {
    if (event.code === 'Escape') {
      const { onEditEnd, id, description } = this.props;
      this.setState({ taskLabel: description });
      onEditEnd(description, id);
    }
  }

  editField = () => {
    const { editing } = this.props;
    if (editing) {
      return (
        <form onSubmit={this.onSubmitHandler}>
          <input
            type="text"
            className="edit"
            value={this.state.taskLabel}
            onChange={this.onTaskEdit}
            onKeyDown={(event) => {
              this.onEscape(event);
            }}
          />
        </form>
      );
    }
  };

  setTime = () => {
    const { timerCount } = this.state;
    const { id, setTimerData } = this.props;
    const newTimerCount = timerCount - 1;
    setTimerData(id, newTimerCount);
    if (newTimerCount <= 0) {
      clearInterval(this.timerStart);
      this.setState({ timer: false });
    }
    return this.setState({ timerCount: newTimerCount });
  };

  onTimerPlay = () => {
    const { timer } = this.state;
    if (!timer) {
      this.setState({ timer: true });
      this.timerStart = setInterval(this.setTime, 1000);
    }
  };

  onTimerPause = () => {
    clearInterval(this.timerStart);
    this.setState({ timer: false });
  };

  transformTime = (time) => {
    const min = `${Math.trunc(time / 60)}`.padStart(2, '0');
    const sec = `${time - min * 60}`.padStart(2, '0');
    return `${min}:${sec}`;
  };

  render() {
    const { completed, editing, id, description, createTime, onComplete, onEditStart, onDeleted } =
      this.props;
    const classNames = [completed ? 'completed' : '', editing ? 'editing' : ''].join(' ');
    const { timerCount } = this.state;

    return (
      <li className={classNames} key={id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            id={`${id}__check`}
            onChange={onComplete}
            checked={completed}
          />
          <label htmlFor={`${id}__check`}>
            <span className="description">{description}</span>
            <div className="timer-block">
              <button
                className="icon-play"
                type="button"
                onClick={!completed ? this.onTimerPlay : () => {}}
              ></button>
              <button className="icon-pause" type="button" onClick={this.onTimerPause}></button>
              <span className="timer-indicator">{this.transformTime(timerCount)}</span>
            </div>
            <span className="created">{formatDistanceToNow(createTime)}</span>
          </label>
          <button className="icon icon-edit" onClick={onEditStart}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {this.editField()}
      </li>
    );
  }
}
