type PostIntercepterParameters = {
  response: Response;
  initialRequestFn: () => Promise<Response>;
};

export type PostInterceptor = {
  (parameters: PostIntercepterParameters): Promise<Response>;
};

export type PreInterceptor = {
  (url: string, options: RequestInit): Promise<[string, RequestInit]>;
};
