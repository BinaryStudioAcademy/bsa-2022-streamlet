import { FC } from 'common/types/types';
import { StudioSidebar } from '../';

import styles from './styles.module.scss';

const StudioAnalytics: FC = () => {
  return (
    <div className={styles.analytics}>
      <StudioSidebar />
    </div>
  );
};
export { StudioAnalytics };
