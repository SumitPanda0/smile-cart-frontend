import { useState, useEffect } from "react";

const useDebounce = value => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 350);

    return () => clearTimeout(timer);
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
