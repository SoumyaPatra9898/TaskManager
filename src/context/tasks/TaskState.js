import React, { useState } from "react";
import TaskContext from "./taskContext";

const TaskState = (props) => {
  const host = "http://localhost:5000";
  const tasksInitial = [];
  const [tasks, setTasks] = useState(tasksInitial);

  // Get all Notes
  const getTasks = async () => {
    // API Call 
    const response = await fetch(`${host}/api/tasks/fetchalltasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const json = await response.json()
    console.log(json)
    setTasks(json)
  }

  // Add a Task
  const addTask = async({ title, description, priority, status }) => {
    // Api call
    const response = await fetch(`${host}/api/tasks/addtask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, description, priority, status})
    });
    console.log(response);

    console.log("Adding a new task");
    const task = {
      "title": title,
      "description": description,
      "priority": priority,
      "status": status
    };
    setTasks(tasks.concat(task));
  }

  // Delete a Task
  const deleteTask = async (id) => {
    // API Call 
    const response = await fetch(`${host}/api/tasks/deletetask/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const json = await response.json()
    console.log(json)

    console.log("Delete the note with id" + id);
    const newTasks = tasks.filter((task) => { return task._id !== id });
    setTasks(newTasks);
  }

  // Edit a Task
  const editTask = async (id, title, description, priority, status) => {
    const response = await fetch(`${host}/api/tasks/updatetask/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, priority, status })
    });
    const json = await response.json();
    console.log(json);

    let newTasks = JSON.parse(JSON.stringify(tasks));
    // Logic to edit in client
    for (let index = 0; index < newTasks.length; index++) {
      const element = newTasks[index];
      if (element._id === id) {
        newTasks[index].title = title;
        newTasks[index].description = description;
        newTasks[index].priority = priority;
        newTasks[index].status = status;
        break;
      }
    }

    setTasks(newTasks);
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, editTask, getTasks }}>
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskState;