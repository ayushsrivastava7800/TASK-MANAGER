import React, { useState } from "react";
import "./App.css"; // Add styling in a separate CSS file or inline

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("low");
  const [editId, setEditId] = useState(null);

  // Handle adding or editing a task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText) return;

    if (editId) {
      // Editing an existing task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editId ? { ...task, text: taskText, priority } : task
        )
      );
      setEditId(null);
    } else {
      // Adding a new task
      setTasks([
        ...tasks,
        { id: Date.now(), text: taskText, priority, isComplete: false },
      ]);
    }

    setTaskText("");
    setPriority("low");
  };

  // Handle deleting a task
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Handle completing a task
  const handleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  // Handle editing a task
  const handleEdit = (id) => {
    const task = tasks.find((task) => task.id === id);
    setTaskText(task.text);
    setPriority(task.priority);
    setEditId(id);
  };

  // Get the background color based on priority
  const getPriorityColor = (priority) => {
    if (priority === "low") return "green";
    if (priority === "medium") return "yellow";
    if (priority === "high") return "red";
    return "white";
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">{editId ? "Edit Task" : "Add Task"}</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              backgroundColor: getPriorityColor(task.priority),
              textDecoration: task.isComplete ? "line-through" : "none",
            }}
          >
            {task.text}
            <div>
              <button onClick={() => handleComplete(task.id)}>
                {task.isComplete ? "Undo" : "Complete"}
              </button>
              <button onClick={() => handleEdit(task.id)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;