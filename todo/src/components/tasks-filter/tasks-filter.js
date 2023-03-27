import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './tasks-filter.css';

export default class TaskFilter extends Component {
  static propTypes = {
    filters: PropTypes.array.isRequired,
    onFilter: PropTypes.func.isRequired,
  };

  render() {
    const { filters, onFilter } = this.props;
    const filtersElements = filters.map((item) => {
      return (
        <li key={item.param}>
          <button
            type="button"
            className={item.active ? 'selected' : ''}
            onClick={() => onFilter(item.param)}
          >
            {item.label}
          </button>
        </li>
      );
    });
    return <ul className="filters">{filtersElements}</ul>;
  }
}
