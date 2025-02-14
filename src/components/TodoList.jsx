import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { TodoItem } from "./TodoItem";

const TodoList = () => {
  const { array, deleteTodo } = useContext(TodoContext);

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  return (
    <ul>
      {array.map((item) => (
        <TodoItem key={item.id} {...item} handleDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default TodoList;
