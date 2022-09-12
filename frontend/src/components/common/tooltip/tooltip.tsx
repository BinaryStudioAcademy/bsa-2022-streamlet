import { ReactElement } from 'react';
import { FC } from 'common/types/types';
import ReactTooltip from 'react-tooltip';
import {
  DARK_THEME_TOOLTIP_BACKGROUND_COLOR,
  DARK_THEME_TOOLTIP_TEXT_COLOR,
  LIGHT_THEME_TOOLTIP_BACKGROUND_COLOR,
  LIGHT_THEME_TOOLTIP_TEXT_COLOR,
} from './tooltip.config';

type props = {
  isLightTheme: boolean;
};

const Tooltip: FC<props> = ({ isLightTheme }): ReactElement => {
  const colorForTooltip = {
    backgroundColor: isLightTheme ? LIGHT_THEME_TOOLTIP_BACKGROUND_COLOR : DARK_THEME_TOOLTIP_BACKGROUND_COLOR,
    textColor: isLightTheme ? LIGHT_THEME_TOOLTIP_TEXT_COLOR : DARK_THEME_TOOLTIP_TEXT_COLOR,
  };

  return (
    <ReactTooltip
      backgroundColor={colorForTooltip.backgroundColor}
      effect="solid"
      textColor={colorForTooltip.textColor}
    />
  );
};

export { Tooltip };
