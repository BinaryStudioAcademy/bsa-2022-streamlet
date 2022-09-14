export const removeItemIfExists = <T extends Record<string, unknown>>(
  arr: T[],
  removeBy: Partial<T> & { [K in keyof T]?: string | number | boolean | null },
): T[] => {
  const brr = [...arr];
  const removeByKeys = Object.keys(removeBy);
  const index = brr.findIndex((i) => removeByKeys.every((k) => removeBy[k] === i[k]));
  if (index >= 0) {
    brr.splice(index, 1);
  }
  return [...brr];
};
