import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';
import styles from './styles.module.scss';
import { ReactComponent as NotSelectedIcon } from 'assets/img/circle-empty-inside.svg';
import { ReactComponent as SelectedIcon } from 'assets/img/circle-selected.svg';

type Props = {
  children?: ReactNode;
  contentContainerClassName?: string;
  isHeader?: boolean;
  isSelected?: boolean;
  isSelectable?: boolean;
  icon?: ReactNode;
  isHoverable?: boolean;
  onClick?: () => void;
};

const ModalItem: FC<Props> = ({
  children,
  onClick,
  isHeader = false,
  isSelected = false,
  isSelectable = false,
  contentContainerClassName,
  icon,
  isHoverable = true,
}) => {
  return (
    <div
      className={clsx(styles['modal-item'], {
        [styles['header']]: isHeader,
        [styles['selected']]: isSelected,
        [styles['selectable']]: isSelectable,
        [styles['icon-modal-item']]: icon,
        [styles['hoverable']]: isHoverable,
      })}
      onClick={onClick}
    >
      <div className={styles['icon-container']}>
        {isSelectable && !isSelected && <NotSelectedIcon height={18} className={styles['icon']} />}
        {isSelected && <SelectedIcon height={18} color="var(--brand-green-color)" className={styles['icon']} />}
        {icon}
      </div>
      <div className={clsx(styles['modal-item-content'], contentContainerClassName)}>{children}</div>
    </div>
  );
};

export { ModalItem };
