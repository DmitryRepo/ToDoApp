import React, { Component } from "react";
import TaskFilter from "../tasks-filter";

import "./footer.css";
export default class Footer extends Component {
  render() {
    const { completeCount, onFilter, onClearActive, filters } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{completeCount} items left</span>
        <TaskFilter onFilter={onFilter} filters={filters} />
        <button className="clear-completed" onClick={onClearActive}>
          Clear completed
        </button>
      </footer>
    );
  }
}
