import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from "./components/Footer";
import About from "./components/About";
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
    <Router>
      <div className="container">
        <Header title="Task Tracker" showAdd={showAddTask} onShowAddTask={() => setShowAddTask(!showAddTask)}></Header>
        <Route path='/' exact render={(props) => (
          <>
            {
              showAddTask && <AddTask onAdd={addTask} />
            }
            {
              tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks to Show'
            }
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
