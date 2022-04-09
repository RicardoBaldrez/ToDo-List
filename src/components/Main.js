import React, { Component } from 'react';

import Form from './Form';
import Tasks from './Tasks';

import './Main.css';

export default class Main extends Component {
  state = {
    index: -1,
    tasks: [],
    newTask: '',
  };

  componentDidMount() {
    const tasksData = JSON.parse(localStorage.getItem('tasks'));

    if (!tasksData) return;

    this.setState({
      tasks: tasksData,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.state;

    if (tasks === prevState.tasks) return;

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tasks, index } = this.state;
    let { newTask } = this.state;
    newTask = newTask.trim();

    if (tasks.indexOf(newTask) !== -1) return;

    const newTasks = [...tasks];

    if (index === -1) {
      this.setState({
        newTask: '',
        tasks: [...newTasks, newTask],
      });
    } else {
      newTasks[index] = newTask;

      this.setState({
        index: -1,
        newTask: '',
        tasks: [...newTasks],
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  };

  handleEdit = (e, index) => {
    const { tasks } = this.state;
    this.setState({
      index,
      newTask: tasks[index],
    });
  };

  handleDelete = (e, index) => {
    const { tasks } = this.state;
    const newTasks = [...tasks];
    newTasks.splice(index, 1);

    this.setState({
      tasks: [...newTasks],
    });
  };

  render() {
    const { newTask, tasks } = this.state;

    return (
      <div className="main">
        <h1>To Do List</h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          newTask={newTask}
        />
        <Tasks
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          tasks={tasks}
        />

      </div>
    );
  }
}
