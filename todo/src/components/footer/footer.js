import React, { Component } from "react";
import TaskFilter from "../tasks-filter";
import PropTypes from "prop-types";

import "./footer.css";
export default class Footer extends Component {
  
  static defaultProps = {
    countTask: 0,
    onFilter: () => {},
    onClearActive: () => {},
  };

  static propTypes = {
    countTask: PropTypes.number,
    onFilter: PropTypes.func,
    onClearActive: PropTypes.func,
  };

  render() {
    const { countTask, onFilter, onClearActive, filters } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{countTask} items left</span>
        <TaskFilter onFilter={onFilter} filters={filters} />
        <button className="clear-completed" onClick={onClearActive}>
          Clear completed
        </button>
      </footer>
    );
  }
}
