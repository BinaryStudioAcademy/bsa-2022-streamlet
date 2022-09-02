export {};
declare global {
  namespace NodeJS {
    interface Global {
      appConfig: {
        envName: string;
        baseUrl: string;
        swaggerUrl: string;
        users: object;
      };
    }
  }
}
