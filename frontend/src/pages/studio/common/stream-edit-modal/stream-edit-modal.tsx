import clsx from 'clsx';
import { Modal } from 'components/common/common';
import { SelectOptions } from 'pages/studio/stream/common/stream-settings-form-values';
import React, { FC, useState } from 'react';
import { StreamAppearanceForm } from './stream-edit-forms/stream-appearance-form/stream-appearance-form';
import { getInitialFormValues } from './stream-edit-forms/stream-basic-info-form/initial-form-values';
import { StreamBasicInfoForm } from './stream-edit-forms/stream-basic-info-form/stream-basic-info-form';
import styles from './styles.module.scss';
import { TabHeader } from './tabs/tab-header/tab-header';
import { Tab } from './tabs/tab.enum';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const mockCategoryOptions: SelectOptions<string>[] = [
  { label: 'Just Chatting', value: '01212jh13239fdds' },
  { label: 'Hot Tubs', value: 'q7y78yd78qdeyrqw' },
  { label: 'Studying', value: 'sduds7ys78ysd78' },
];

const StreamEditModal: FC<Props> = ({ onClose, isOpen }) => {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.GeneralInfo);
  const [isParentModalInvisible, setIsParentModalInvisible] = useState(false);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentContainerClassName={clsx(styles['modal-container'], isParentModalInvisible && styles['invisible'])}
    >
      <div className={styles['header']}>
        <h1 className={styles['heading']}>Stream settings</h1>
      </div>
      <TabHeader currentTab={currentTab} setTab={setCurrentTab} />
      {currentTab === Tab.GeneralInfo && (
        <StreamBasicInfoForm initialValues={getInitialFormValues()} categoryOptions={mockCategoryOptions} />
      )}
      {currentTab === Tab.Appearance && <StreamAppearanceForm setParentModalInvisible={setIsParentModalInvisible} />}
    </Modal>
  );
};

export { StreamEditModal };
