import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';
import { Header } from './header/header';
import styles from './styles.module.scss';

type Props = {
  children?: ReactNode;
  className?: string;
  title: string;
};

const BlockContainer: FC<Props> = ({ children, title, className }) => {
  return (
    <section className={clsx(styles['block-container'], className)}>
      <Header title={title} />
      <div>{children}</div>
    </section>
  );
};

export { BlockContainer };
