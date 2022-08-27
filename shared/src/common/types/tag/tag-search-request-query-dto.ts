export type TagSearchRequestQueryDto = {
  take?: number;
  skip?: number;
  tags: string[] | string;
};
