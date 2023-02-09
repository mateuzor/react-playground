import { createContext, useState } from "react";
import { TodoContextType, ITodo } from "../@types/todo";

interface Props {
  children?: React.ReactNode;
}

const initialValue = {
  todos: [],
  saveTodo: () => {},
  updateTodo: () => {},
};

export const TodoContext = createContext<TodoContextType>(initialValue);

const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<ITodo[]>([
    {
      id: 1,
      title: "post 1",
      description: "this is a description",
      status: false,
    },
    {
      id: 2,
      title: "post 2",
      description: "this is a description",
      status: true,
    },
  ]);
  const saveTodo = (todo: ITodo) => {
    const { title, description } = todo;
    const newTodo: ITodo = {
      id: Math.random(), // not really unique - but fine for this example
      title: title,
      description: description,
      status: false,
    };
    setTodos([...todos, newTodo]);
  };
  const updateTodo = (id: number) => {
    todos.filter((todo: ITodo) => {
      if (todo.id === id) {
        todo.status = true;
        setTodos([...todos]);
      }
    });
  };
  return (
    <TodoContext.Provider value={{ todos, saveTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
