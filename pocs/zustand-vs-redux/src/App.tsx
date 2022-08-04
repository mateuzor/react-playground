import "./App.css";
//redux
import { increment } from "./features/counter/counter-slice";
import { useAppDispatch, userAppSelector } from "./app/hooks";

//zustand
import useCountStore from "./stores/count";

function App() {
  //Redux
  const dispatch = useAppDispatch();
  const count = userAppSelector((state) => state.counter.value);

  //Zustand
  const { value, incrementZustand } = useCountStore((state) => state);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <button type="button" onClick={() => dispatch(increment())}>
            Add 1 (Redux)
          </button>
        </p>
        <p>Redux count is: {count}</p>
        <p>
          <button type="button" onClick={() => incrementZustand()}>
            Add 1 (Zustand)
          </button>
        </p>
        <p>Zustand count is: {value}</p>
      </header>
    </div>
  );
}

export default App;
