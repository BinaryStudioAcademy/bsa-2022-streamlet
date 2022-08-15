type PostIntercepterParameters = {
  response: Response;
  initialRequest: {
    url: string;
    options: RequestInit;
  };
  makeRequestFn: (url: string, options: RequestInit) => Promise<Response>;
};

type PreInterceptorParamters = {
  options: RequestInit;
  url: string;
};

export type PostInterceptor = {
  (parameters: PostIntercepterParameters): Promise<Response>;
};

export type PreInterceptor = {
  (parameters: PreInterceptorParamters): Promise<[string, RequestInit]>;
};
