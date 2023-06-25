import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Use a timer to delay updating the debounced value
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    // Cleanup function to clear the timer when the value or delay changes
    return () => {
      clearTimeout(timer); // Clear the timer to prevent memory leaks
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
