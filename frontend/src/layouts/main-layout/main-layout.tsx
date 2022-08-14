import { FC } from 'common/types/types';
import { Header } from 'components/common/header/header';
import { Sidebar } from 'components/common/sidebar/sidebar';
import { FunctionComponent } from 'react';

import styles from './main-layout.module.scss';

interface LayoutProps {
  component: FunctionComponent;
}

const MainLayout: FC<LayoutProps> = ({ component: Component }) => (
  <div className={styles['layout-wrapper']}>
    <Header />
    <section className={styles['content-section']}>
      <Sidebar />
      <div className={styles['main-content']}>
        <Component />
      </div>
    </section>
  </div>
);

export { MainLayout };
