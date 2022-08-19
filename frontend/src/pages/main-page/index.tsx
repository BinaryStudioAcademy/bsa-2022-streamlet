import { FC } from 'common/types/types';
import { VideoPlayer } from 'components/common/common';
import { HeaderContainer } from 'components/common/header/header-container';

import styles from './main-page.module.scss';

const MainPage: FC = () => {
  return (
    <main className={styles.main}>
      <HeaderContainer />
      <VideoPlayer
        videoAttributes={{ poster: 'https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg' }}
        url={'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'}
        sizingProps={{
          width: '50%',
          aspectRatio: '16 / 9',
        }}
      />
      <VideoPlayer
        videoAttributes={{ poster: 'https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg' }}
        url={'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'}
        isLive
        sizingProps={{
          width: '50%',
          aspectRatio: '16 / 9',
        }}
      />
    </main>
  );
};

export { MainPage };
