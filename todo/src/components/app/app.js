import React, { Component } from "react";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

import "./app.css";

export default class App extends Component {
  maxId = 100;

  state = {
    tasks: [],
    activeFilter: "all",
    filters: [
      { label: "All", param: "all", active: true },
      { label: "Active", param: "active", active: false },
      { label: "Completed", param: "completed", active: false },
    ],
  };

  createTask = (label) => {
    return {
      description: label,
      createTime: new Date(),
      completed: false,
      editing: false,
      id: this.maxId++,
    };
  };

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex((element) => element.id === id);
    const oldItem = arr[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    const newtodoData = [
      ...arr.slice(0, index),
      newItem,
      ...arr.slice(index + 1, arr.length),
    ];
    return newtodoData;
  }

  getFilteredTasks = () => {
    const { activeFilter, tasks } = this.state;
    if (activeFilter === "all") {
      return tasks;
    } else if (activeFilter === "completed") {
      return tasks.filter((task) => task.completed);
    } else if (activeFilter === "active") {
      return tasks.filter((task) => !task.completed);
    }
  };

  onTaskCreate = (label) => {
    this.setState((state) => {
      const tasks = [...state.tasks].reverse();
      tasks.push(this.createTask(label));
      return { tasks: tasks.reverse() };
    });
  };

  onCompleteTaskHandler = (id) => {
    this.setState((state) => ({
      tasks: this.toggleProperty(state.tasks, id, "completed"),
    }));
  };

  onDeleteTaskHandler = (id) => {
    this.setState(() => ({
      tasks: this.state.tasks.filter((item) => item.id !== id),
    }));
  };

  editStartTaskHandler = (id) => {
    this.setState((state) => {
      const tasks = state.tasks.map((task) => {
        return {
          ...task,
          editing: false,
        };
      });
      return {
        tasks: this.toggleProperty(tasks, id, "editing"),
      };
    });
  };

  editEndTaskHandler = (value, id) => {
    this.setState((state) => {
      const tasks = state.tasks.map((task) => {
        return task.id !== id
          ? task
          : {
              ...task,
              editing: false,
              description: value,
            };
      });
      return {
        tasks,
      };
    });
  };

  onClearActive = () => {
    this.setState((state) => {
      return {
        tasks: state.tasks.filter((task) => !task.completed),
      };
    });
  };

  filterHandler = (param) => {
    this.setState((state) => {
      const filters = state.filters.map((filter) => {
        return {
          ...filter,
          active: filter.param === param,
        };
      });
      return {
        filters,
        activeFilter: param,
      };
    });
  };

  render() {
    const { tasks, filters } = this.state;
    const filteredTasks = this.getFilteredTasks();
    const countTask = tasks.filter((task) => !task.completed).length;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onTaskCreate={this.onTaskCreate} />
        </header>
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onComplete={this.onCompleteTaskHandler}
            onDeleted={this.onDeleteTaskHandler}
            onEditStart={this.editStartTaskHandler}
            onEditEnd={this.editEndTaskHandler}
          />
        </section>
        <Footer
          countTask={countTask}
          filters={filters}
          onFilter={this.filterHandler}
          onClearActive={this.onClearActive}
        />
      </section>
    );
  }
}
