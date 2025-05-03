import { useState, useEffect } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      const newTask = await res.json();
      setTasks(prev => [...prev, newTask]);
      setTitle('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Görev Listesi</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Yeni görev girin"
        />
        <button type="submit">Ekle</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
