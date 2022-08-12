import { StudioSidebar } from '../sidebar';
import { FC } from 'common/types/types';

import styles from './styles.module.scss';

type Props = Record<string, unknown>;

const Studio: FC<Props> = () => {
  return (
    <div className={styles.studio}>
      <StudioSidebar />
    </div>
  );
};
export { Studio };
