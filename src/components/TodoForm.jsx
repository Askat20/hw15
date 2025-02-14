import React, { useContext, useState } from "react";
import styled from "styled-components";
import { TodoContext } from "../context/TodoContext";

export const TodoForm = () => {
  const [todoValue, setTodoValue] = useState("");
  const { addNewTodo } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewTodo(todoValue);
  };

  const handleChange = (e) => {
    setTodoValue(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Add a new todo..."
        value={todoValue}
        onChange={handleChange}
      />
      <Button type="submit">Add Todo</Button>
    </Form>
  );
};
const Form = styled.form`
  display: flex;
  width: 450px;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 3px;
  cursor: pointer;
`;
