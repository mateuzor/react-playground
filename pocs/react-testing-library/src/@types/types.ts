export type TodoType = {
  id: string;
  task: string;
  completed: boolean;
};

export type InputPropTypes = {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  todos: TodoType[];
};
