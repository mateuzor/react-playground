import "./App.css";
import TodoProvider from "./context/todoContext";
import Todos from "./containers/Todos";
import { AddTodo } from "./components/AddTodo";

function App() {
  return (
    <TodoProvider>
      <main className="App">
        <h1>My Todos</h1>
        <AddTodo />
        <Todos />
      </main>
    </TodoProvider>
  );
}

export default App;
