import React from "react";
import { formatDistanceToNow } from "date-fns";

import "./task.css";


const Task = (props) => {    
  return(
    <li className={props.state} key={props.id}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{props.description}</span>
          <span className="created">
            {formatDistanceToNow(props.createTime)}
          </span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      {props.state === "editing" ? (
        <input type="text" className="edit" value={props.description} />
      ) : null}
    </li>
  );
};

export default Task;
