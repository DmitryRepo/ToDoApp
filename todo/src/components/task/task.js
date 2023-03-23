import React from "react";
import { formatDistanceToNow } from "date-fns";

import "./task.css";

const Task = (props) => {
  return (
    <li className={props.condition} key={props.id}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          id={`${props.id}__check`}
          onChange={props.onSwitch}
        />
        <label htmlFor={`${props.id}__check`}>
          <span className="description">{props.description}</span>
          <span className="created">
            {formatDistanceToNow(props.createTime)}
          </span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={props.onDelete}></button>
      </div>
      {props.condition === "editing" ? (
        <input type="text" className="edit" value={props.description} />
      ) : null}
    </li>
  );
};

export default Task;
