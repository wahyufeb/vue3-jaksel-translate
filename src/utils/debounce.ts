const debounce = (func: () => void, wait: number): (() => void) => {
  let timeout: number | undefined;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func();
    }, wait);
  };
};

export default debounce;
