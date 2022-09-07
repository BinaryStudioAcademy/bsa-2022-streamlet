import { FC } from 'react';
import { StreamPosterUploadRequestDto } from 'shared/build';
import styles from './styles.module.scss';
import { UploadStreamPreview } from './upload-stream-preview/upload-stream-preview';

type Props = {
  setParentModalInvisible: (shouldBeInvisible: boolean) => void;
  handleImageUpload: (image: Omit<StreamPosterUploadRequestDto, 'videoId'>) => void;
  currentPreviewPicture: string;
};

const StreamAppearanceForm: FC<Props> = ({ setParentModalInvisible, handleImageUpload, currentPreviewPicture }) => {
  return (
    <div className={styles['form']}>
      <UploadStreamPreview
        currentPreviewPicture={currentPreviewPicture}
        setParentModalInvisible={setParentModalInvisible}
        handleImageUpload={handleImageUpload}
      />
    </div>
  );
};

export { StreamAppearanceForm };
