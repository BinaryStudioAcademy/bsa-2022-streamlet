export const updateItemIfExists = <T extends Record<string, unknown>>(
  arr: T[],
  updateBy: Partial<T> & { [K in keyof T]?: string | number | boolean | null },
  updateItem: Partial<T>,
): T[] => {
  const brr = [...arr];
  const replaceByKeys = Object.keys(updateBy);
  const index = brr.findIndex((i) => replaceByKeys.every((k) => updateBy[k] === i[k]));
  if (index >= 0) {
    brr[index] = { ...brr[index], ...updateItem };
  }
  return [...brr];
};
