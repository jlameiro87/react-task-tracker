const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks');
  const data = await res.json();

  return data;
}

const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`);
  const data = await res.json();

  return data;
}

const addTasks = async (task) => {
  const res = await fetch(`http://localhost:5000/tasks`,
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  });

  const data = await res.json();
  return data;
}

const deleteTasks = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
}

const toggleTaskReminder = async (id) => {
  const task = await fetchTask(id);
  const updatedTask = {...task, reminder: !task.reminder};

  await fetch(`http://localhost:5000/tasks/${id}`,
  {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updatedTask)
  });
}

export { fetchTasks, fetchTask, addTasks, deleteTasks, toggleTaskReminder }