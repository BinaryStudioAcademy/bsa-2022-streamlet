import { getTextFormatedViewsString } from 'helpers/helpers';
import { secondsToHours } from './helpers';

export enum OverviewChartTab {
  VIEWS = 'VIEWS',
  WATCH_TIME = 'WATCH_TIME',
  SUBSCRIBERS = 'SUBSCRIBERS',
}

export const matchOverviewChartTabWithTitle: Record<OverviewChartTab, string> = {
  [OverviewChartTab.VIEWS]: 'Views',
  [OverviewChartTab.WATCH_TIME]: 'Watch time (hours)',
  [OverviewChartTab.SUBSCRIBERS]: 'Subscribers',
};

export const matchOverviewChartTabWithValueFunc: Record<OverviewChartTab, (v: number) => string> = {
  [OverviewChartTab.VIEWS]: (v: number): string => getTextFormatedViewsString(v),
  [OverviewChartTab.WATCH_TIME]: (v: number): string => getTextFormatedViewsString(Math.round(secondsToHours(v))),
  [OverviewChartTab.SUBSCRIBERS]: (v: number): string => getTextFormatedViewsString(v),
};
