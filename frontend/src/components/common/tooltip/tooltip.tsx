import { ReactElement } from 'react';
import { FC } from '../../../common/types/react/fc.type';
import ReactTooltip from 'react-tooltip';

type props = {
  place: 'left' | 'right' | 'top' | 'bottom';
  isLightTheme: boolean;
};

const Tooltip: FC<props> = ({ isLightTheme, place }): ReactElement => {
  const colorForTooltip = {
    backgroundColor: isLightTheme ? '#c3cfc0' : '#000000',
    textColor: isLightTheme ? '#000000' : '#ffffff',
  };

  return (
    <ReactTooltip
      place={place}
      backgroundColor={colorForTooltip.backgroundColor}
      effect="solid"
      textColor={colorForTooltip.textColor}
    />
  );
};

export { Tooltip };
