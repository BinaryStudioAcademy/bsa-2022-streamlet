export const pushOrDeleteIfExists = <T>(value: T, array: T[]): T[] => {
  if (array.indexOf(value) === -1) {
    return [...array, value];
  }
  return [...array.filter((el) => el !== value)];
};
