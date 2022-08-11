import { FC } from 'common/types/types';

import { SendMessage } from 'components/common/send-message/send-message';
import { VideoComment } from './video-comment/video-comment';
import { Comment } from 'shared/src/common/types/comment';

import './video-chat.scss';

const comments: Comment[] = [
  {
    id: 1,
    avatar: 'https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg',
    name: 'Imam Farrhouk',
    date_added: '4 min ago',
    text: 'We are facing a serious business dilemma, with Facebook taking away a good chunk of traffic to news and content sites, and ad blockers eating into what’s left of it while slashing ad revenues.',
  },
  {
    id: 2,
    avatar: 'https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg',
    name: 'Imam Farrhouk',
    date_added: '4 min ago',
    text: 'We are facing a serious business dilemma, with Facebook taking away a good chunk of traffic to news.',
  },
  {
    id: 3,
    avatar: 'https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg',
    name: 'Imam Farrhouk',
    date_added: '4 min ago',
    text: 'We are facing a serious business dilemma, and ad blockers eating into what’s left of it while slashing ad revenues.',
  },
  {
    id: 4,
    avatar: 'https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg',
    name: 'Imam Farrhouk',
    date_added: '4 min ago',
    text: 'We are facing a serious business dilemma, with Facebook taking away a good chunk of traffic to news and content sites, and ad blockers eating into what’s left of it while slashing ad revenues.',
  },
  {
    id: 5,
    avatar: 'https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg',
    name: 'Imam Farrhouk',
    date_added: '4 min ago',
    text: 'We are facing a serious business dilemma, with Facebook taking away a good chunk of traffic to news and content sites, and ad blockers eating into what’s left of it while slashing ad revenues.',
  },
];

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
