import { FC } from 'common/types/types';
import { Header } from 'components/common/header/header';

import './main-page.scss';

const MainPage: FC = () => {
  return (
    <main className="main">
      <Header />
    </main>
  );
};

export { MainPage };
