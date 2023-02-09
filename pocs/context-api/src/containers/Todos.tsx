import { ITodo } from "../@types/todo";
import { TodoContext } from "../context/todoContext";
import Todo from "../components/Todo";
import { useContext } from "react";

const Todos = () => {
  const { todos, updateTodo } = useContext(TodoContext);
  return (
    <>
      {todos.map((todo: ITodo) => (
        <Todo key={todo.id} updateTodo={updateTodo} todo={todo} />
      ))}
    </>
  );
};

export default Todos;
