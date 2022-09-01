import { Modal } from 'components/common/common';
import { SelectOptions } from 'pages/studio/stream/common/stream-settings-form-values';
import React, { FC } from 'react';
import { getInitialFormValues } from './stream-edit-form/initial-form-values';
import { StreamEditForm } from './stream-edit-form/stream-edit-form';
import styles from './styles.module.scss';

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
  return (
    <Modal isOpen={isOpen} onClose={onClose} contentContainerClassName={styles['modal-container']}>
      <StreamEditForm
        initialValues={getInitialFormValues()}
        onSubmit={(values): void => {
          // eslint-disable-next-line no-console
          console.log(values);
        }}
        categoryOptions={mockCategoryOptions}
      />
    </Modal>
  );
};

export { StreamEditModal };
