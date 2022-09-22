import { FC } from 'common/types/types';
import styles from './styles.module.scss';
import { useEffect, RefObject } from 'react';
import { useRef } from '../../../hooks/hooks';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../../common/enums/app/app';
import clsx from 'clsx';
type Event = MouseEvent | TouchEvent;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
): void => {
  useEffect(() => {
    const listener = (event: Event): void => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event); // Call the handler only if the click is outside of the element passed.
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return (): void => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};

type Props = {
  headerText: string;
  mainText: string;
  className?: string;
  onClose: () => void;
};

const NeedSignInModal: FC<Props> = ({ headerText, mainText, onClose, className }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const clickOutsideHandle = (): void => {
    onClose();
  };
  useOnClickOutside(modalRef, clickOutsideHandle);

  return (
    <div className={clsx(styles['need-sign-in-modal'], className)} ref={modalRef}>
      <div className={styles['need-sign-in-modal-header']}>{headerText}</div>
      <div className={styles['need-sign-in-main-text']}>{mainText}</div>
      <Link to={{ pathname: AppRoutes.SIGN_IN, hash: pathname }} className={styles['redirect-to-sign-in']}>
        Sign in
      </Link>
    </div>
  );
};

export { NeedSignInModal };
