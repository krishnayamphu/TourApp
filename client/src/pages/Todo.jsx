import axios from "axios";
import { useEffect, useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState({ name: "", password: "" });
  useEffect(() => {
    //axios.get("http://localhost:3000/todos").then((res) => setTodos(res.data));
  }, []);

  const handleChange = (e) => {
    setTodos({ ...todos, [e.target.id]: e.target.value });
  };
  const addTodo = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/todo", todos, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <>
      <div className="container flex flex-col items-center mx-auto py-4">
        <h1>Todo List</h1>
        <div className="p-4 my-8 shadow">
          <form className="flex gap-2" onSubmit={addTodo}>
            <input
              type="text"
              id="name"
              onChange={handleChange}
              className="flex-1 border p-2 rounded-l"
              placeholder="Add a new task"
            />
            <input
              type="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
            />

            <button className="bg-blue-500 text-white px-4 rounded-r">
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
