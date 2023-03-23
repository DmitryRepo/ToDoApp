import React from "react";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

import "./app.css";

const App = (props) => {
  const tasks = [
    {
      description: "Completed task",
      createTime: new Date(),
      state: "completed",
      id: 1,
    },
    {
      description: "Editing task",
      createTime: new Date(),
      state: "editing",
      id: 2,
    },
    {
      description: "Active task",
      createTime: new Date(),
      state: null,
      id: 3,
    },
  ];
  
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList tasks={tasks} />
      </section>
      <Footer />
    </section>
  );
};

export default App;
