import React from "react";
import "./Column.css";
import Task from "./Task";

function Column({ state }) {
  return (
    <div className="column">
      <p>{state} </p>
      <Task title={"Todo"} />
    </div>
  );
}

export default Column;
