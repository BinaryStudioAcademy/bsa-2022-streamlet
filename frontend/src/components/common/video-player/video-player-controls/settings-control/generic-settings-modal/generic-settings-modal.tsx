import React, { FC, ReactNode, useCallback } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
  children?: ReactNode;
  className?: string;
};

const GenericSettingsModal: FC<Props> = ({ className, children }) => {
  const focusOnMount = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      element.focus();
    }
  }, []);
  return (
    <div className={clsx(className, styles['settings-modal'])} tabIndex={0} ref={focusOnMount}>
      {children}
    </div>
  );
};

export { GenericSettingsModal };
