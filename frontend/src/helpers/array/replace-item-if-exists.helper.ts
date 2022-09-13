export const replaceItemIfExists = <T extends Record<string, unknown>>(
  arr: T[],
  replaceBy: Partial<T> & { [K in keyof T]?: string | number | boolean | null },
  replaceItem: T,
): T[] => {
  const brr = [...arr];
  const replaceByKeys = Object.keys(replaceBy);
  const index = brr.findIndex((i) => replaceByKeys.every((k) => replaceBy[k] === i[k]));
  if (index >= 0) {
    brr[index] = replaceItem;
  }
  return [...brr];
};
