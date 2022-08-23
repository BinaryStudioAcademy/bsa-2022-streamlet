export type CancellableRequest<T> = {
  response: Promise<T>;
  cancelRequest: () => void;
};
