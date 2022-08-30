import { ReactNode } from 'react';
import { Tab } from './tabs.enum';

export type TabInfo = {
  tab: Tab;
  title: string;
  component: ReactNode;
};
