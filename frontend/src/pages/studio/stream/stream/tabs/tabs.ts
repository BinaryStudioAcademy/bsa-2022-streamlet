export enum Tab {
  SETTINGS = 'settings',
  // ANALYTICS = 'analytics',
}

export type TabInfo = {
  tab: Tab;
  title: string;
};

export const tabs: Readonly<Record<Tab, TabInfo>> = {
  [Tab.SETTINGS]: {
    tab: Tab.SETTINGS,
    title: 'Settings',
  },
  // [Tab.ANALYTICS]: {
  //   tab: Tab.ANALYTICS,
  //   title: 'Analytics',
  // },
} as const;
