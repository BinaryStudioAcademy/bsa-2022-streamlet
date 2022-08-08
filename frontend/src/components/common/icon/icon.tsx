import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconColor, IconName } from 'common/enums/enums';
import { iconNameToSvgIcon } from './common';

type Props = {
  className: string;
  name: string;
  color: string;
  isLoading: boolean;
};

const Icon = ({ className, name, color, isLoading }: Props): JSX.Element => (
  <FontAwesomeIcon className={className} icon={iconNameToSvgIcon[name]} color={color} size={'lg'} spin={isLoading} />
);

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.oneOf(Object.values(IconName)).isRequired,
  color: PropTypes.oneOf(Object.values(IconColor)),
  isLoading: PropTypes.bool,
};

Icon.defaultProps = {
  className: undefined,
  color: null,
  isLoading: false,
};

export { Icon };
