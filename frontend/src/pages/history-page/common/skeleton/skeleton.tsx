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
import { SkeletonTheme } from 'react-loading-skeleton';

import style from '../../styles.module.scss';

type props = {
  isLightTheme: boolean;
};

const HistoryLoader: FC<props> = ({ isLightTheme }): ReactElement => {
  const { width } = useWindowDimensions();

  const baseColor = isLightTheme ? LIGHT_THEME_BASE_COLOR : DARK_THEME_BASE_COLOR;

  const highlightColor = isLightTheme ? LIGHT_THEME_HIGHLIGHT_COLOR : DARK_THEME_HIGHLIGHT_COLOR;

  if (width <= 575) {
    return (
      <>
        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
          <VideoSkeleton />
        </SkeletonTheme>
      </>
    );
  }

  return (
    <ContentLoader speed={2} viewBox="0 0 450 100" backgroundColor={baseColor} foregroundColor={highlightColor}>
      <rect x="210" y="9" rx="3" ry="3" width="320" height="6" />
      <rect x="239" y="49" rx="3" ry="3" width="178" height="6" />
      <circle cx="220" cy="52" r="13" />
      <rect x="-1" y="1" rx="0" ry="0" width="200" height="149" />
      <rect x="210" y="25" rx="3" ry="3" width="178" height="6" />
    </ContentLoader>
  );
};

const generateHistorySkeletons = (isLightTheme: boolean): ReactElement => {
  return (
    <div className={style['skeleton-container']}>
      {new Array(10).fill('skeleton').map((value, index) => (
        <HistoryLoader key={`${value}${index}`} isLightTheme={isLightTheme} />
      ))}
    </div>
  );
};

export { generateHistorySkeletons };
