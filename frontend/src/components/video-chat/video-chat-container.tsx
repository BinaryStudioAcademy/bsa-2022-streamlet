import { FC } from 'common/types/types';
import { VideoChat } from './video-chat';
import { comments } from './comments.mock';

const VideoChatContainer: FC = () => <VideoChat comments={comments} />;

export { VideoChatContainer };
