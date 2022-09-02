import { Video, History } from '@prisma/client';
import { HistoryListType } from 'shared/build';
import { trimVideo } from '~/shared/helpers/index';

export const trimHistory = (
  history: History & {
    video: Video & {
      channel: {
        id: string;
        name: string;
        avatar: string;
      };
    };
  },
): HistoryListType => {
  return {
    id: history.id,
    userId: history.userId,
    videoId: history.videoId,
    video: trimVideo(history.video),
    createdAt: history.createdAt,
    updatedAt: history.updatedAt,
  };
};
