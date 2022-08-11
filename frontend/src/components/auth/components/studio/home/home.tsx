import { FC } from 'common/types/types';

import styles from './styles.module.scss';

type Props = Record<string, unknown>;

const StudioHome: FC<Props> = () => {
  return <div className={styles.home}>Home</div>;
};
export { StudioHome };
