import { AppRoutes, IconColor, IconName } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Icon } from 'components/common/icon';
import { useAppDispatch, useEffect, useNavigate } from 'hooks/hooks';
import { streamActions } from 'store/actions';

import styles from './styles.module.scss';

const StudioHome: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const data = await dispatch(streamActions.getStreamData()).unwrap();
      console.error(data);
      if (data.stream) {
        navigate(`${AppRoutes.STUDIO_STREAM}/${data.stream.id}`, { replace: true });
      }
    };
    fetch();
  }, [dispatch, navigate]);

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
