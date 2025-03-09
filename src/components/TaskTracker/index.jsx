import { Component } from 'react';
import { FiPlus } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import TaskItem from '../TaskItem'; 

import './index.css';

class TaskTracker extends Component {
  state = {
    tasks: [],
    task: ''
  };

  handleInputChange = (event) => {
    this.setState({ task: event.target.value });
  };

  addTask = () => {
    if (this.state.task.trim()) {
      const newTask = { id: uuidv4(), name: this.state.task, completed: false };
      this.setState((prevState) => ({
        tasks: [...prevState.tasks, newTask],
        task: ''
      }));
    }
  };

  deleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((t) => t.id !== id)
    }));
  };

  toggleComplete = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    }));
  };

  render() {
    return (
      <div className="task-tracker-container">
        <h1>Task Tracker App</h1>
        <div className="task-input-container">
          <input
            type="text"
            value={this.state.task}
            onChange={this.handleInputChange}
            placeholder="Add new task"
          />
          <button onClick={this.addTask}>
            <FiPlus size={18} /> Add Task
          </button>
        </div>
        <ul className="task-list">
          {this.state.tasks.map((t) => (
            <TaskItem key={t.id} task={t} toggleComplete={this.toggleComplete} deleteTask={this.deleteTask} />
          ))}
        </ul>
      </div>
    );
  }
}

export default TaskTracker;
