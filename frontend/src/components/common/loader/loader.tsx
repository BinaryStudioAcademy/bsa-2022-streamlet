import React, { FC } from 'react';
import clsx from 'clsx';
import { LoaderSize } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  hCentered?: boolean;
  vCentered?: boolean;
  className?: string;
  spinnerSize?: LoaderSize | string;
};

const Loader: FC<Props> = ({ hCentered = true, vCentered = true, className, spinnerSize = LoaderSize.MD }) => {
  const isSpinnerSizeCustom = Object.values(LoaderSize).includes(spinnerSize as LoaderSize);

  return (
    <div
      className={clsx(styles['loader-wrapper'], className, styles[spinnerSize], {
        [styles['h-centered']]: hCentered,
        [styles['v-centered']]: vCentered,
      })}
      style={!isSpinnerSizeCustom ? ({ '--spinner-height': spinnerSize } as React.CSSProperties) : undefined}
    >
      <div className={styles['loader']}></div>
      <div className={styles['loader']}></div>
      <div className={styles['loader']}></div>
    </div>
  );
};

export { Loader };
