import { FC } from 'common/types/types';

import { SendMessage } from 'components/common/send-message/send-message';
import { VideoComment } from './video-comment/video-comment';
import { comments } from './comments.mock';

import './video-chat.scss';

const VideoChat: FC = () => {
  return (
    <div className="video-chat-wrapper">
      <div className="video-chat">
        {comments.map((comment) => (
          <VideoComment key={comment.id} comment={comment} />
        ))}
      </div>
      <SendMessage />
    </div>
  );
};

export { VideoChat };
