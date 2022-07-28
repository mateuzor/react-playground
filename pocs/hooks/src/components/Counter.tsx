import { useEffect, useState, useMemo, useCallback } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [calc, setCalc] = useState(() => 423789 * 234798);
  // we can pass a function to avoid being calculated every time the component updates

  const result = useMemo(() => {
    console.log("useMemo");
    982738973947239 * 479847234982;
  }, []);
  //use to memoize values that we dont want to be recreated in which render

  const increaseCounter = useCallback(() => {
    console.log("increase counter callback");
  }, []);

  useEffect(() => {
    console.log("render");
  }, []);

  useEffect(() => {
    console.log("it was mounted");
  }, [count]);

  useEffect(() => {
    return () => {
      console.log("it was unmounted");
    };
  }, []); // we can use the unmount as a clean up to cancel
  //fetch requests, or remove a event listener for example

  return (
    <button
      type="button"
      onClick={() => setCount((prevCount) => prevCount + 1)}
      //good practice to pass a callback with the previous state when using the own
      //state being updated to avoid desync
    >
      count is: {count}
    </button>
  );
}

export default Counter;
