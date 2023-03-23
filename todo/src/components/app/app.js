import React, { Component } from "react";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

import "./app.css";

export default class App extends Component {
  state = {
    tasks: [
      {
        description: "Completed task",
        createTime: new Date(),
        condition: "completed",
        id: 1,
      },
      {
        description: "Editing task",
        createTime: new Date(),
        condition: "editing",
        id: 2,
      },
      {
        description: "Active task",
        createTime: new Date(),
        condition: null,
        id: 3,
      },
    ],
  };

  onSwitchTaskHandler = (id) => {
    const newTaskMass = [...this.state.tasks];
    const indexTask = newTaskMass.findIndex((element) => element.id === id);
    const conditionTask = newTaskMass[indexTask].condition;

    newTaskMass[indexTask].condition =
      conditionTask !== "completed" ? "completed" : null;

    this.setState(() => ({
      tasks: newTaskMass,
    }));
  };

  onDeleteTaskHandler = (id) => {
    this.setState(() => ({
      tasks: this.state.tasks.filter((item) => item.id !== id),
    }));
  };

  render() {
    const { tasks } = this.state;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList
            tasks={tasks}
            onSwitch={this.onSwitchTaskHandler}
            onDelete={this.onDeleteTaskHandler}
          />
        </section>
        <Footer />
      </section>
    );
  }
}
