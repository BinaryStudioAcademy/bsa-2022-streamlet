import { FC } from 'common/types/types';
import { StudioSidebar } from '../';

import styles from './styles.module.scss';

type Props = Record<string, unknown>;

const StudioAnalystics: FC<Props> = () => {
  return (
    <div className={styles.analystics}>
      <StudioSidebar />
    </div>
  );
};
export { StudioAnalystics };
