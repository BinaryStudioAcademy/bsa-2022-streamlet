import { FC } from 'common/types/types';
import { StudioSidebar } from '..';

import styles from './styles.module.scss';

type Props = Record<string, unknown>;

const StudioAnalytics: FC<Props> = () => {
  return (
    <div className={styles.analytics}>
      <StudioSidebar />
    </div>
  );
};
export { StudioAnalytics };
