export const omitProperties = <T extends Record<string, unknown>>(keys: (keyof T)[], obj: T): Partial<T> => {
  const objectCopy = Object.assign({}, obj);
  keys.forEach((key) => {
    delete objectCopy[key];
  });
  return objectCopy;
};
