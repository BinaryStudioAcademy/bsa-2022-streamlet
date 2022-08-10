import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Routes, Route, Header, Button } from 'components/common/common';
import { Auth } from 'components/auth/auth';
import { useState } from 'hooks/hooks';

import styles from './styles.module.scss';

const App: FC = () => {
  const [isActive, setState] = useState(false);

  const info = (message: string): JSX.Element => {
    return (
      <>
        <div>
          {message}. User token isActive: {isActive ? 'true' : 'false'}
        </div>
        <Button label="Change user token active status" onClick={(): void => setState(!isActive)} />
      </>
    );
  };

  return (
    <>
      <header>
        <Header isActive={isActive} />
      </header>
      <main>
        <div className={styles.sidebar}>s</div>
        <div className={styles.content}>
          <Routes>
            <Route path={AppRoute.ROOT} element={info('Root page')} />
            <Route path={AppRoute.STREAM} element={info('Stream page')} />
            <Route path={AppRoute.BROWSE} element={info('Browse page')} />
            <Route path={AppRoute.FOLLOWING} element={info('Following page')} />
            <Route path={AppRoute.HISTORY} element={info('History page')} />
            <Route path={AppRoute.CHANNEL_ID} element={info('Channel id page')} />
            <Route path={AppRoute.SIGN_UP} element={<Auth />} />
            <Route path={AppRoute.SIGN_IN} element={<Auth />} />
          </Routes>
        </div>
      </main>
    </>
  );
};

export { App };
