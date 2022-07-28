import "./App.css";
import Counter from "./components/Counter";
import NameInput from "./components/NameInput";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NameInput />
        <br />
        <Counter />
      </header>
    </div>
  );
}

export default App;
