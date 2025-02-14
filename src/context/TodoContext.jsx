import { createContext, useEffect, useReducer } from "react";
import { deleteReques, getTodoRequest, postReques } from "../api/TodoRequesrt";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "getTodo": {
      return { ...state, todos: payload };
    }

    default: {
      return state;
    }
  }
};
export const TodoContext = createContext({});

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { todos: [] });

  const getTodo = async () => {
    const data = await getTodoRequest();
    dispatch({ type: "getTodo", payload: data });
  };
  useEffect(() => {
    getTodo();
  }, []);

  const addNewTodo = async (title) => {
    const newTodo = {
      title,
      id: Date.now().toString(),
    };
    await postReques(newTodo);
    getTodo();
  };
  const deleteTodo = async (id) => {
    await deleteReques(id);
    getTodo();
  };
  const updateTodo = async (id, newTitle) => {
    const updatedTodo = { id, title: newTitle };
    await postReques(updatedTodo);
    getTodo();
  };

  const contextValue = {
    addNewTodo,
    array: state.todos,
    deleteTodo,
    updateTodo,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
