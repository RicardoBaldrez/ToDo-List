import React, { Component } from 'react';

// Form
import { FaPlus } from 'react-icons/fa';

import './Main.css';

export default class Main extends Component {
  state = {
    newTask: '',
  };

  handleChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  };

  render() {
    const { newTask } = this.state;

    return (
      <div className="main">
        <h1>To Do List</h1>
        <form action="#" className="form">
          <input
            type="text"
            value={newTask}
            onChange={this.handleChange}
          />
          <button type="submit">
            <FaPlus />
          </button>
        </form>
      </div>
    );
  }
}
