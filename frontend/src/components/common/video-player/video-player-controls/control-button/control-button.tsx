import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
};

const ControlButton = React.forwardRef<HTMLAnchorElement | null, Props>(
  ({ onClick, className, children, onFocus, onBlur }, ref) => {
    return (
      <a
        tabIndex={0}
        role="button"
        ref={ref}
        className={clsx(styles['button'], className)}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {children}
      </a>
    );
  },
);

export { ControlButton };
