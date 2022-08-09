import clsx from 'clsx';

import styles from './styles.module.scss';

type Props = {
  alt: string;
  isCircular: boolean;
  className: string;
  height: string;
  src: string;
  width: string;
};

const Image = ({ alt, isCircular, className, height, src, width }: Props): JSX.Element => (
  <img
    className={clsx(styles.image, isCircular && styles.circular, className)}
    width={width}
    height={height}
    src={src}
    alt={alt}
  />
);

export { Image };
