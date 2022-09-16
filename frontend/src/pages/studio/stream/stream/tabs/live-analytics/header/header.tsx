import { customSelectStyles } from 'pages/studio/common/stream-settings-modal/stream-settings-forms/custom-select-styles';
import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import ReactSelect, { SingleValue } from 'react-select';
import { Tab } from '../tabs/tab.enum';
import styles from './styles.module.scss';

type Props = {
  onTabChange: (tab: Tab) => void;
  portal: HTMLElement;
};

type TabInfo = {
  tab: Tab;
  title: string;
};
const tabOptions: Readonly<Record<Tab, TabInfo>> = {
  [Tab.VIEWS]: {
    tab: Tab.VIEWS,
    title: 'Views',
  },
  [Tab.CHAT]: {
    tab: Tab.CHAT,
    title: 'Chat',
  },
  [Tab.ALL]: {
    tab: Tab.ALL,
    title: 'Other',
  },
} as const;

const Header: FC<Props> = ({ onTabChange, portal }) => {
  return ReactDOM.createPortal(
    <section>
      <ReactSelect
        options={Object.values(tabOptions).map((option) => ({
          value: option.tab,
          label: option.title,
        }))}
        styles={customSelectStyles}
        className={styles['select']}
        onChange={(newValue): void => {
          const value = newValue as unknown as SingleValue<{ label: string; value: Tab }>;
          value && onTabChange(value.value);
        }}
        defaultValue={{ value: Tab.VIEWS, label: tabOptions.views.title }}
      />
    </section>,
    portal,
  );
};

export { Header };
