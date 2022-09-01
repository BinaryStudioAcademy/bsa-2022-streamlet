import React, { FC } from 'react';
import styles from './styles.module.scss';
import { UploadStreamPreview } from './upload-stream-preview/upload-stream-preview';

type Props = {
  setParentModalInvisible: (shouldBeInvisible: boolean) => void;
};

const StreamAppearanceForm: FC<Props> = ({ setParentModalInvisible }) => {
  return (
    <div className={styles['form']}>
      <UploadStreamPreview currentPreviewPicture="" setParentModalInvisible={setParentModalInvisible} />
    </div>
  );
};

export { StreamAppearanceForm };
