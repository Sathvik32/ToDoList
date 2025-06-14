import { useEffect, useState } from "react";
import Todo from "./Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  
  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch("/api/todos");
      const data = await res.json();
      setTodos(data);
    };
    getTodos();
  }, []);

  
  const createNewTodo = async (e) => {
    e.preventDefault();
    
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: content })
    });
    const newTodo = await res.json();
    
    setTodos((cur) => [...cur, newTodo]);
    setContent("");
  };

  return (
    <main className="container">
      <h1 className="title">Awesome Todos</h1>

      <form className="form" onSubmit={createNewTodo}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a new todo..."
          className="form__input"
          required
        />
        <button type="submit">Create Todo</button>
      </form>

      <div className="todos">
        {todos.length === 0 && <p>No todos yet!</p>}
        {todos.map((todo) => (
         <Todo key={todo._id} todo = {todo} setTodos={setTodos}   />
        ))}
      </div>
    </main>
  );
}