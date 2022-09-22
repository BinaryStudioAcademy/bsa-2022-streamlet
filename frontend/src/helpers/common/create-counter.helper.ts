const createCounter = (): { (): number } => {
  let counter = 0;
  return (): number => {
    counter++;
    return counter;
  };
};

export { createCounter };
