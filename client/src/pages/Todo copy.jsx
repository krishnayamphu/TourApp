import axios from "axios";
import { useEffect, useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/todos").then((res) => setTodos(res.data));
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setTodos([...todos, { name: input, completed: false }]);

      await axios
        .post("http://localhost:3000/todo", todos, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
        });
      setInput("");
    }
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <>
      <div className="container flex flex-col items-center mx-auto py-4">
        <h1>Todo List</h1>
        <div className="p-4 my-8 shadow">
          <form className="flex gap-2" onSubmit={addTodo}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border p-2 rounded-l"
              placeholder="Add a new task"
            />
            <button className="bg-blue-500 text-white px-4 rounded-r">
              Add
            </button>
          </form>

          <ul className="flex flex-col gap-2 mt-4">
            {todos.map((todo, index) => (
              <li key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
                  className="mr-2"
                />
                <span
                  className={`flex-1 text-gray-900 ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.name}
                </span>
                <button
                  onClick={() => removeTodo(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
