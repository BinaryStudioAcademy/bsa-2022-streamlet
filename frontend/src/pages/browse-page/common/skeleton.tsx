import { SkeletonTheme } from 'react-loading-skeleton';
import { VideoSkeleton } from '../../../components/common/video-skeleton/video-skeleton';
import React, { ReactElement } from 'react';
import {
  DARK_THEME_BASE_COLOR,
  DARK_THEME_HIGHLIGHT_COLOR,
  LIGHT_THEME_BASE_COLOR,
  LIGHT_THEME_HIGHLIGHT_COLOR,
} from './skeleton-config';
import { FC } from '../../../common/types/react/fc.type';

type props = {
  isLightTheme: boolean;
};

const BrowsePageSkeleton: FC<props> = ({ isLightTheme }) => {
  const baseColor = isLightTheme ? LIGHT_THEME_BASE_COLOR : DARK_THEME_BASE_COLOR;

  const highlightColor = isLightTheme ? LIGHT_THEME_HIGHLIGHT_COLOR : DARK_THEME_HIGHLIGHT_COLOR;

  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <VideoSkeleton />
    </SkeletonTheme>
  );
};

const generateBrowsePageSkeleton = (isLightTheme: boolean, count = 10): ReactElement[] => {
  return new Array(count)
    .fill('skeleton')
    .map((val, index) => <BrowsePageSkeleton key={`${index}${val}`} isLightTheme={isLightTheme} />);
};

export { generateBrowsePageSkeleton };
