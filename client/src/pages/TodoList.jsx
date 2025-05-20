import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (title.trim() === '') return;
    const res = await axios.post(API_URL, { title });
    setTodos([...todos, res.data]);
    setTitle('');
  };

  const updateTodo = async (id, newTitle) => {
    await axios.put(`${API_URL}/${id}`, { title: newTitle });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New todo" />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => {
              const newTitle = prompt("Edit Todo:", todo.title);
              if (newTitle) updateTodo(todo.id, newTitle);
            }}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
