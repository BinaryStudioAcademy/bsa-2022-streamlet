import { StreamPrivacyLabel } from 'common/enums/enums';
import { useAppSelector } from 'hooks/hooks';
import React, { FC } from 'react';
import styles from './styles.module.scss';

const PrivacyDisplay: FC = () => {
  const streamPrivacy = useAppSelector((state) => state.stream.stream?.privacy);

  return (
    <div className={styles['text-field-container']}>
      <p className={styles['field-caption']}>Privacy:</p>
      <p className={styles['field-value']}>{StreamPrivacyLabel[streamPrivacy ?? 'PUBLIC']}</p>
    </div>
  );
};

export { PrivacyDisplay };
