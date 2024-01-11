import { useEffect, useRef } from "react";

export function useInterval(callback: Function, delay: number | null) {
  const savedCallback = useRef<Function>();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function callbackFunc() {
      savedCallback.current?.();
    }
    if (delay !== null) {
      let id = setInterval(callbackFunc, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}