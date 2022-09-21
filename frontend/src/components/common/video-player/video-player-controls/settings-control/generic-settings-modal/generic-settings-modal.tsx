import React, { FC, ReactNode, useCallback } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
  children?: ReactNode;
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLDivElement, Element>) => void;
  innerRef?: React.MutableRefObject<HTMLDivElement | null>;
};

const GenericSettingsModal: FC<Props> = ({ className, children, onBlur, innerRef }) => {
  const focusOnMount = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      element.focus();
    }
  }, []);
  return (
    <div
      className={clsx(className, styles['settings-modal'])}
      tabIndex={0}
      ref={(value): void => {
        focusOnMount(value);
        if (innerRef) {
          innerRef.current = value;
        }
      }}
      onBlur={onBlur}
    >
      {children}
    </div>
  );
};

export { GenericSettingsModal };
