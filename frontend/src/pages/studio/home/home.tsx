import { IconColor, IconName } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Icon } from 'components/common/icon';

import styles from './styles.module.scss';

const StudioHome: FC = () => {
  return (
    <div className={styles['studio']}>
      <h1 className={styles['header']}>Welcome to Studio!</h1>
      <div className={styles['controls']}>
        <button className={styles['button']}>
          <Icon name={IconName.CAMERA} color={IconColor.WHITE} width="60" height="60" />
          <p>Start streaming</p>
        </button>
      </div>
    </div>
  );
};
export { StudioHome };
