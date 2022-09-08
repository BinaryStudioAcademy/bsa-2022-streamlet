import { Button, UploadImage } from 'components/common/common';
import { ErrorBox } from 'components/common/errors/errors';
import defaultPoster from 'assets/img/default/video-default.png';
import { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { ImageListType } from 'react-images-uploading';
import { StreamPosterUploadRequestDto } from 'shared/build';

type Props = {
  currentPreviewPicture: string;
  setParentModalInvisible: (shouldBeInvisible: boolean) => void;
  handleImageUpload: (image: Omit<StreamPosterUploadRequestDto, 'videoId'>) => void;
};

const UploadStreamPreview: FC<Props> = ({ currentPreviewPicture, setParentModalInvisible, handleImageUpload }) => {
  const [error] = useState<string | undefined>();
  const [isSelectingPicture, setIsSelectingPicture] = useState(false);

  useEffect(() => {
    setParentModalInvisible(isSelectingPicture);
  }, [isSelectingPicture, setParentModalInvisible]);

  const [images, setImages] = useState([]);
  const onImageSelectButton = (): void => {
    setIsSelectingPicture(true);
  };
  const onImageUploadClose = (): void => {
    setIsSelectingPicture(!isSelectingPicture);
    setImages([]);
  };
  const onImageUpload = (imageList: ImageListType): void => {
    setImages(imageList as never[]);
    const posterBase64 = imageList[0].dataURL;
    if (posterBase64) {
      handleImageUpload({ base64Str: posterBase64 });
    }
    setIsSelectingPicture(false);
  };

  return (
    <>
      <div className={styles['container']}>
        <img
          src={currentPreviewPicture || defaultPoster}
          alt="profile picture preview"
          className={styles['preview-img']}
        />
        <Button type="button" content="Change stream preview picture" onClick={onImageSelectButton} />
        {isSelectingPicture && (
          <UploadImage
            images={images}
            onUpload={onImageUpload}
            onClose={onImageUploadClose}
            modalClassName={styles['image-upload-modal']}
          />
        )}
        {error && <ErrorBox message={error} />}
      </div>
    </>
  );
};

export { UploadStreamPreview };
