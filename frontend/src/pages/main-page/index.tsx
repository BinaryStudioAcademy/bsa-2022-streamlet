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
        height={400}
      />
    </main>
  );
};

export { MainPage };
