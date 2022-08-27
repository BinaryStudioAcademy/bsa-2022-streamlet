import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

type Props = {
  children?: ReactNode;
  isHeader?: boolean;
  isSelected?: boolean;
  isSelectable?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
};

const ModalItem: FC<Props> = ({
  children,
  onClick,
  isHeader = false,
  isSelected = false,
  isSelectable = false,
  icon,
}) => {
  return (
    <div
      className={clsx(styles['modal-item'], {
        [styles['header']]: isHeader,
        [styles['selected']]: isSelected,
        [styles['selectable']]: isSelectable,
        [styles['icon-modal-item']]: icon,
      })}
      onClick={onClick}
    >
      <div>
        {isSelected && '\u2713'}
        {icon}
      </div>
      <div className={styles['modal-item-content']}>{children}</div>
    </div>
  );
};

export { ModalItem };
