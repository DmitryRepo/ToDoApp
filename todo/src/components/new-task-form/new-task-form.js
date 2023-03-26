import React, { Component } from "react";
import PropTypes from 'prop-types';

import "./new-task-form.css";

export default class NewTaskForm extends Component {

  static propTypes = {
    onTaskCreate: PropTypes.func.isRequired,
  };
  
  state = {
    label: "",
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onTaskCreate(this.state.label);
    this.setState({
      label: "",
    });
  };

  changeHandler = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.changeHandler}
          value={this.state.label}
          autoFocus
        />
      </form>
    );
  }
}
