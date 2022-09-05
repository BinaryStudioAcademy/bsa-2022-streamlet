import { Comment } from '../comment';

interface ResponseRepliesForComment {
  data: Comment[];
  commentId: string;
}

export { ResponseRepliesForComment };
