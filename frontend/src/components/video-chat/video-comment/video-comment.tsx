import { FC } from 'common/types/types';
import { Comment } from 'shared/src/common/types/comment';

import './video-comment.scss';

type Props = {
  comment: Comment;
};

const VideoComment: FC<Props> = ({ comment }) => {
  return (
    <div className="video-comment">
      <div className="main-part-comment">
        <div className="commentators-avatar" style={{ backgroundImage: `url(${comment.avatar})` }}></div>
        <p className="commentators-name">{comment.name}</p>
        <span className="dispatch-time">{comment.date_added}</span>
      </div>
      <div className="content-part-comment">
        <p className="text-comment">{comment.text}</p>
      </div>
    </div>
  );
};

export { VideoComment };
