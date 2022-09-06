import style from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'common/enums/enums';
import { ReactElement } from 'react';

const NotFound = (): ReactElement => {
  const navigate = useNavigate();
  const redirectToMainPage = (): void => {
    navigate(`${AppRoutes.ROOT}`, { replace: true });
  };

  return (
    <div className={style['page-container']}>
      <div className={style['error-description-container']}>
        <span className={style['error-code']}>404</span>
        <span className={style['error-text']}>not found</span>
      </div>
      <button onClick={redirectToMainPage} type="button" className={style['go-home-button']}>
        Go to home page
      </button>
    </div>
  );
};

export { NotFound };
