import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  static propTypes = {
    onTaskCreate: PropTypes.func.isRequired,
  };

  state = {
    label: '',
    minute: '',
    seconds: '',
    id: 100,
    empty: false,
  };

  submitHandler = (event) => {
    const { id, label, minute, seconds } = this.state;
    event.preventDefault();
    const timer = Number(minute) * 60 + Number(seconds);
    this.props.onTaskCreate(id, label, timer);
    this.setState({
      label: '',
      minute: '',
      seconds: '',
      id: id + 1,
    });
  };

  changeHandler = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  changeHandlerMin = (event) => {
    this.setState({
      minute: event.target.value,
    });
  };
  changeHandlerSec = (event) => {
    this.setState({
      seconds: event.target.value,
    });
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.submitHandler}>
        <input
          className="new-todo"
          placeholder="Task"
          onChange={this.changeHandler}
          value={this.state.label}
          autoFocus
          required
          pattern="^[^\s]+(\s.*)?$"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.changeHandlerMin}
          type="number"
          value={this.state.minute}
          min="0"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.changeHandlerSec}
          type="number"
          value={this.state.seconds}
          min="0"
          max="59"
        />
        <button type="submit"></button>
      </form>
    );
  }
}
