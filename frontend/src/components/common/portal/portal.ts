import { useEffect, useMemo } from 'hooks/hooks';
import styles from './styles.module.scss';
import { FC } from 'common/types/types';
import ReactDOM from 'react-dom';
import { ReactElement } from 'react';

type Props = {
  children: ReactElement;
};
const Portal: FC<Props> = ({ children }) => {
  const portalContainer = useMemo(() => {
    const el = document.createElement('div');
    el.classList.add(styles.portal);

    return el;
  }, []);

  useEffect(() => {
    const wasOverflowHidden = document.body.classList.contains(styles['no-overflow']);
    document.body.appendChild(portalContainer);
    document.body.classList.add(styles['no-overflow']);

    return () => {
      document.body.removeChild(portalContainer);
      if (!wasOverflowHidden) {
        document.body.classList.remove(styles['no-overflow']);
      }
    };
  }, [portalContainer]);

  return ReactDOM.createPortal(children, portalContainer);
};

export { Portal };
