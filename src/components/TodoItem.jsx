import React from "react";
import styled from "styled-components";

export const TodoItem = ({ title, id, handleDelete }) => {
  return (
    <ListItem>
      <h3>{title}</h3>
      <Button onClick={() => handleDelete(id)}>Delete</Button>
    </ListItem>
  );
};
const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
`;

const Button = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  height: 30px;
  width: 80px;
  transition: background-color 0.3s;
`;
