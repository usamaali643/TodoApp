import { useState } from "react";
import { useTodoContext } from "../contexts";

function TodoItem({ todo }) {
  const [isEditible, setisEditible] = useState(false);
  const [newTitle, setnewTitle] = useState(todo.todo);

  const { todoListUpdate, todoListDelete, todoListToggle } = useTodoContext();
  const handleEdit = () => {
    todoListUpdate(todo.id, { ...todo, todo: newTitle });
    setisEditible(false);
  };
  const toggleComplete = () => {
    todoListToggle(todo.id);
  };
  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-white ${
        todo.completed ? "bg-[#8c9683]" : "bg-[#6655b4]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleComplete}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
            isEditible ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={newTitle}
        onChange={(e) => setnewTitle(e.target.value)}
        readOnly={!isEditible}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isEditible) {
            handleEdit();
          } else setisEditible((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isEditible ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => todoListDelete(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
