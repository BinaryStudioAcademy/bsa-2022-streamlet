export type Comment = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  author: {
    avatar?: string;
    username: string;
    firstName?: string;
    lastName?: string;
  };
};
