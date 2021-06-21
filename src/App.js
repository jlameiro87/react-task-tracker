import { useState, useEffect } from "react";

import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { fetchTasks, addTasks, deleteTasks, toggleTaskReminder } from "./api";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    
    getTasks();
  }, []);

  const addTask = async (task) => {
    const data = await addTasks(task);
    setTasks([...tasks, data]);
  }

  const deleteTask = async (id) => {
    await deleteTasks(id);
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  }

  const toggleReminder = async (id) => {
    await toggleTaskReminder(id);

    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  }

  return (
    <div className="container">
      <Header title="Task Tracker" showAdd={showAddTask} onShowAddTask={() => setShowAddTask(!showAddTask)}></Header>
      {
        showAddTask && <AddTask onAdd={addTask} />
      }
      {
        tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks to Show'
      }
    </div>
  );
}

export default App;
