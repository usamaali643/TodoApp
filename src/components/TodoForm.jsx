import { useState } from "react";
import { useTodoContext } from "../contexts";

function TodoForm() {
  const [todo, setTodo] = useState("");

  const { todoListAdd } = useTodoContext();

  const addTodo = (e) => {
    e.preventDefault();

    if (todo.trim() === "") {
      alert("Todo input  cannot be empty!");
      return;
    }
    todoListAdd({ id: Date.now(), todo, completed: false });
    setTodo("");
  };

  return (
    <form onSubmit={addTodo} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0 cursor-pointer"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
