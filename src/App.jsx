import { useEffect, useState } from "react";
import { TodoContextProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const todoListAdd = (todoObject) =>
    setTodos((previousArray) => [todoObject, ...previousArray]);
  // ADD TODO END HERE

  const todoListUpdate = (id, todoObject) =>
    setTodos((previousArray) =>
      previousArray.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, ...todoObject } : prevTodo
      )
    );
  // UPDATE TODO END HERE

  const todoListDelete = (id) =>
    setTodos((previousArray) =>
      previousArray.filter((prevTodo) => prevTodo.id !== id)
    );

  // DELETE TODO END HERE

  const todoListToggle = (id) =>
    setTodos((previousArray) =>
      previousArray.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  // TOGGLE TODO LIST ITEM END HERE

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContextProvider
      value={{
        todos,
        todoListAdd,
        todoListUpdate,
        todoListDelete,
        todoListToggle,
      }}
    >
      <div className="bg-slate-800 min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-lg rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((eachVal) => (
              <div key={eachVal.id} className="w-full">
                <TodoItem todo={eachVal} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
