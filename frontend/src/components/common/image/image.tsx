import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

type Props = {
  alt: string;
  isCentered: boolean;
  isCircular: boolean;
  className: string;
  height: number;
  src: string;
  width: number;
};

const Image = ({ alt, isCentered, isCircular, className, height, src, width }: Props): JSX.Element => (
  <img
    className={clsx(styles.image, isCircular && styles.circular, isCentered && styles.centered, className)}
    width={width}
    height={height}
    src={src}
    alt={alt}
  />
);

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  isCentered: PropTypes.bool,
  isCircular: PropTypes.bool,
  className: PropTypes.string,
  height: PropTypes.string,
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
};

Image.defaultProps = {
  isCentered: false,
  isCircular: false,
  className: undefined,
  height: undefined,
  size: undefined,
  width: undefined,
};

export { Image };
