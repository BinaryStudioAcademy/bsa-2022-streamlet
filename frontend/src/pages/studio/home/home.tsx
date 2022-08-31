import { AppRoutes, IconColor, IconName } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Icon } from 'components/common/icon';
import { useAppDispatch, useAppSelector, useEffect, useNavigate } from 'hooks/hooks';
import { Link } from 'react-router-dom';
import { streamActions } from 'store/actions';

import styles from './styles.module.scss';

const StudioHome: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { stream } = useAppSelector((state) => ({
    stream: state.stream.stream,
  }));

  useEffect(() => {
    dispatch(streamActions.getStreamingInfo());
  }, [dispatch]);

  useEffect(() => {
    if (stream) {
      navigate(`${AppRoutes.STUDIO_STREAM}/${stream.id}`, { replace: true });
    }
  }, [stream, navigate]);

  return (
    <div className={styles['studio']}>
      <h1 className={styles['header']}>Welcome to Studio!</h1>
      <div className={styles['controls']}>
        <Link to={AppRoutes.STUDIO_NEW_STREAM}>
          <button className={styles['button']}>
            <Icon name={IconName.CAMERA} color={IconColor.WHITE} width="60" height="60" />
            <p>Start streaming</p>
          </button>
        </Link>
      </div>
    </div>
  );
};
export { StudioHome };
