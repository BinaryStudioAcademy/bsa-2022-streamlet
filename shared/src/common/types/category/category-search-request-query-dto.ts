export type CategorySearchRequestQueryDto = {
  take?: number;
  skip?: number;
  categories: string[] | string;
};
