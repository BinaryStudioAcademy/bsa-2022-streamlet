export type Comment = {
  id: string;
  avatar?: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  dateAdded: Date;
  text: string;
  likeNum: number;
  dislikeNum: number;
};
