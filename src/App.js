import React, { useState } from 'react';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('low');

    const addTask = () => {
        if (!task) return;
        setTasks([...tasks, { task, priority }]);
        setTask('');
        setPriority('low');
    };

    const priorityStyle = (priority) => {
        switch (priority) {
            case 'high':
                return { backgroundColor: 'red', color: 'white' };
            case 'medium':
                return { backgroundColor: 'yellow', color: 'black' };
            case 'low':
                return { backgroundColor: 'green', color: 'white' };
            default:
                return {};
        }
    };

    return (
        <div className="App">
            <h1>Task Manager</h1>
            <div className="task-input">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button onClick={addTask}>Add Task</button>
            </div>
            <ul className="task-list">
                {tasks.map((t, index) => (
                    <li key={index} style={priorityStyle(t.priority)}>
                        {t.task} (Priority: {t.priority})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;