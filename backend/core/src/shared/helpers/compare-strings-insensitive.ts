const compareStringsInsensitive = (...args: string[]): boolean => {
  if (args.length === 0) {
    return false;
  }
  const arg = args[0].toLowerCase();
  return args.every((a) => a.toLowerCase() === arg);
};

export { compareStringsInsensitive };
