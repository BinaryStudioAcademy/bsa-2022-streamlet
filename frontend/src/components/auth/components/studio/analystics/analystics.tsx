import { FC } from 'common/types/types';

import styles from './styles.module.scss';

type Props = Record<string, unknown>;

const StudioAnalystics: FC<Props> = () => {
  return <div className={styles.analystics}>Analystics</div>;
};
export { StudioAnalystics };
