import { FC } from 'common/types/types';
import { useState } from 'react';
import { StreamEditModal } from '../common/stream-edit-modal/stream-edit-modal';

import styles from './styles.module.scss';

const StudioAnalytics: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <div className={styles['studio']}>
      <h1 className={styles['header']}>Analytics</h1>
      <h1 className={styles['body']}></h1>
      <StreamEditModal
        isOpen={isModalOpen}
        onClose={(): void => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};
export { StudioAnalytics };
