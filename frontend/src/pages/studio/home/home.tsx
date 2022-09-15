import { IconColor, IconName } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Icon } from 'components/common/icon';
import styles from './styles.module.scss';

type Props = {
  handleStartStreaming(): void;
};

const StudioHome: FC<Props> = ({ handleStartStreaming }) => {
  return (
    <div className={styles['studio']}>
      <h1 className={styles['header']}>Welcome to Studio!</h1>
      <div className={styles['controls']}>
        <button className={styles['button']} onClick={handleStartStreaming}>
          <Icon name={IconName.CAMERA} color={IconColor.WHITE} width="74" height="74" className={styles['icon']} />
          <p>Start streaming</p>
        </button>
        {/* <button className={styles['button']}>
          <Icon name={IconName.TIME_AGO} color={IconColor.WHITE} width="70" height="70" />
          <p>Schedule the stream</p>
        </button> */}
      </div>
    </div>
  );
};
export { StudioHome };
