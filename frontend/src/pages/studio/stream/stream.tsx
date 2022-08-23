// import { IconColor, IconName } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { useParams } from 'react-router-dom';
// import { Loader, UploadImage } from 'components/common/common';
// import { Icon } from 'components/common/icon';
// import { useState } from 'react';

import styles from './styles.module.scss';

// const video = {
//   previewImage: 'https://i3.ytimg.com/vi/EtjDLZKL1rc/maxresdefault.jpg',
//   title: 'Test stream 12',
//   description: 'Me testing stream!',
//   streamingKey: 'testkey',
//   videoId: 'teststream',
// };

// type UpdateStreamRequestDto = {
//   title?: string,
//   description?: string,
// }

const StudioStream: FC = () => {
  const { id } = useParams();
  // const [isNeedUpload, setIsNeedUpload] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | undefined>();
  // const [formError, setFormError] = useState<string | undefined>();
  // const [formLoading, setFormLoading] = useState<boolean>(false);
  // const [images, setImages] = useState([]);

  // const onFormSubmit = async (submitValue: UpdateProfileValue): Promise<void> => {
  //   // const request: ProfileUpdateRequestDto = {
  //   //   ...submitValue,
  //   //   userId: user?.id as string,
  //   // };
  //   // await handleUpdateProfileDataSubmit(request);

  // };

  // const onUploadImageClose = (): void => {
  //   setIsNeedUpload(!isNeedUpload);
  // };

  return <div className={styles['studio']}>{id}</div>;
};
export { StudioStream };

/* {isNeedUpload && <UploadImage images={images} onUpload={onChange} onClose={onUploadImageClose} />}
<div className={styles['row1']}>
  <div className={styles['video-preview']}></div>
  {isLoading ? (
    <Loader spinnerSize={'xs'} vCentered={true} hCentered={true} />
  ) : (
    <img
      className={styles['profile-image-preview']}
      src={video.previewImage === '' ? defaultPreview : video.previewImage}
      alt="profile picture preview"
    />
  )}
  <div className={styles['image-upload-control-container']}>
    <button
      type="button"
      className={styles['image-upload-button']}
      onClick={(): void => {
        setIsNeedUpload(!isNeedUpload);
      }}
    >
      Upload profile image
    </button>
    <span>
      {error ? (
        <span className={styles['error-message']}>{error}</span>
      ) : (
        'File format: JPEG/PNG, max size: 10MB'
      )}
    </span>
  </div>
</div> */
