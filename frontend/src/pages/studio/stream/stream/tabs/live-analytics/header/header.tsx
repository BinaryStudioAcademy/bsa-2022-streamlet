import { customSelectStyles } from 'pages/studio/common/stream-settings-modal/stream-settings-forms/custom-select-styles';
import React, { FC } from 'react';
import ReactSelect from 'react-select';
import styles from './styles.module.scss';

const Header: FC = () => {
  return (
    <section>
      <ReactSelect
        options={[
          {
            label: 'Viewers',
            value: 'viewers',
          },
          {
            label: 'Chat',
            value: 'chat',
          },
          {
            label: 'All',
            value: 'all',
          },
        ]}
        styles={customSelectStyles}
        className={styles['select']}
        defaultValue={{ value: 'viewers', label: 'Viewers' }}
      />
    </section>
  );
};

export { Header };
