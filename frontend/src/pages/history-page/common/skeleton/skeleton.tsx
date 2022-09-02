import ContentLoader from 'react-content-loader';
import React, { FC, ReactElement } from 'react';
import { useWindowDimensions } from '../../../../hooks/hooks';
import { VideoSkeleton } from '../../../../components/common/video-skeleton/video-skeleton';
import {
  DARK_THEME_BASE_COLOR,
  DARK_THEME_HIGHLIGHT_COLOR,
  LIGHT_THEME_BASE_COLOR,
  LIGHT_THEME_HIGHLIGHT_COLOR,
} from './skeleton-config';

type props = {
  isLightTheme: boolean;
};

const HistoryLoader: FC<props> = ({ isLightTheme }): ReactElement => {
  const { width } = useWindowDimensions();

  if (width <= 575) {
    return <VideoSkeleton />;
  }

  return (
    <ContentLoader
      speed={2}
      viewBox="0 0 1028 124"
      backgroundColor={isLightTheme ? LIGHT_THEME_BASE_COLOR : DARK_THEME_BASE_COLOR}
      foregroundColor={isLightTheme ? LIGHT_THEME_HIGHLIGHT_COLOR : DARK_THEME_HIGHLIGHT_COLOR}
    >
      <rect x="231" y="9" rx="3" ry="3" width="320" height="6" />
      <rect x="254" y="49" rx="3" ry="3" width="178" height="6" />
      <circle cx="240" cy="52" r="13" />
      <rect x="-1" y="1" rx="0" ry="0" width="225" height="149" />
      <rect x="231" y="25" rx="3" ry="3" width="178" height="6" />
    </ContentLoader>
  );
};

const generateHistorySkeletons = (isLightTheme: boolean): ReactElement[] => {
  return new Array(10)
    .fill('skeleton')
    .map((value, index) => <HistoryLoader key={`${value}${index}`} isLightTheme={isLightTheme} />);
};

export { generateHistorySkeletons };
