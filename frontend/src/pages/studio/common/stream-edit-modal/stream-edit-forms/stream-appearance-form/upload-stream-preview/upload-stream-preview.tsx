import { Button, UploadImage } from 'components/common/common';
import { ErrorBox } from 'components/common/errors/errors';
import defaultAvatar from 'assets/img/default/video-default.png';
import React, { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { ImageListType } from 'react-images-uploading';

type Props = {
  currentPreviewPicture: string;
  setParentModalInvisible: (shouldBeInvisible: boolean) => void;
};

const UploadStreamPreview: FC<Props> = ({ currentPreviewPicture, setParentModalInvisible }) => {
  const [error] = useState<string | undefined>();
  const [isSelectingPicture, setIsSelectingPicture] = useState(false);

  useEffect(() => {
    setParentModalInvisible(isSelectingPicture);
  }, [isSelectingPicture, setParentModalInvisible]);

  const onImageUpload = (imageList: ImageListType): void => {
    // TODO: logic for updating image
    // eslint-disable-next-line no-console
    console.log(imageList);

    setIsSelectingPicture(false);
  };

  return (
    <>
      <div className={styles['container']}>
        <img
          src={currentPreviewPicture || defaultAvatar}
          alt="profile picture preview"
          className={styles['preview-img']}
        />
        <Button
          type="button"
          content="Change stream preview picture"
          onClick={(): void => {
            setIsSelectingPicture(true);
          }}
        />
        {isSelectingPicture && (
          <UploadImage
            images={[]}
            onUpload={onImageUpload}
            onClose={(): void => setIsSelectingPicture(false)}
            modalClassName={styles['image-upload-modal']}
          />
        )}

        {error && <ErrorBox message={error} />}
      </div>
    </>
  );
};

export { UploadStreamPreview };
