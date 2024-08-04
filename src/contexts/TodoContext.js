import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      title: "Todo Message",
      completed: false,
    },
  ],
  todoListAdd: (todo) => {},
  todoListUpdate: (id , todo ) => {},
  todoListDelete: (id) => {},
  todoListToggle: (id) => {},
});

export const TodoContextProvider = TodoContext.Provider;

export const useTodoContext = () => useContext(TodoContext);
