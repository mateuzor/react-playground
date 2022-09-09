import React, { useState } from "react";
import { TodoType } from "../../@types/types";
import AddInput from "../AddInput/AddInput";
import Header from "../Header/Header";
import TodoList from "../TodoList/TodoList";
import "./Todo.css";

function Todo() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  return (
    <div className="todo">
      <Header title="Todo" />
      <AddInput setTodos={setTodos} todos={todos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default Todo;
