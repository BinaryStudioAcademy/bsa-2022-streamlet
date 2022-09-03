import { TabInfo } from './tab-info';
import { Tab } from './tab.enum';

export const tabs: Record<Tab, TabInfo> = {
  generalinfo: {
    tab: Tab.GeneralInfo,
    title: 'General Info',
  },
  appearance: {
    tab: Tab.Appearance,
    title: 'Appearance',
  },
} as const;
