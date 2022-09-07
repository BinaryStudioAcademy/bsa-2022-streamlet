import { BaseVideoResponseDto } from 'common/types/types';
import { VideoCard } from 'components/search/components/components';
import { useAppSelector } from 'hooks/hooks';
import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  video: BaseVideoResponseDto;
};

const RecVideoCard: FC<Props> = ({ video }) => {
  const isLightTheme = useAppSelector((state) => state.theme.isLightTheme);

  return (
    <VideoCard
      video={video}
      isLightTheme={isLightTheme}
      classNames={{
        videoCardClassName: styles['video-card'],
        previewClassName: styles['preview'],
        infoClassName: styles['info'],
        metaFooter: styles['meta-footer'],
        metaClassName: styles['meta'],
        channelIcon: styles['channel-icon'],
        authorAvatar: styles['author-avatar'],
        author: styles['author'],
        desc: styles['desc'],
      }}
    />
  );
};

export { RecVideoCard };
