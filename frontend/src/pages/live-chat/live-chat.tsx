import { FC } from 'common/types/types';
import { NotFound } from 'components/not-found-page/not-found';
import { VideoChatContainer } from 'components/video-chat/video-chat-container';
import { useSearchParams } from 'hooks/hooks';
import { LiveChatQueryParams } from './config';

import styles from './styles.module.scss';

const LiveChat: FC = () => {
  const [queryParams] = useSearchParams();

  if (!queryParams.has(LiveChatQueryParams.CHAT_ID)) {
    return <NotFound />;
  }

  return (
    <div className={styles['chat-block']}>
      <VideoChatContainer videoId={queryParams.get(LiveChatQueryParams.CHAT_ID) as string} popOut={false} />
    </div>
  );
};

export { LiveChat };
