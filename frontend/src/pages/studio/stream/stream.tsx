// import { IconColor, IconName } from 'common/enums/enums';
import clsx from 'clsx';
import { FC } from 'common/types/types';
import { Input, PasswordInput } from 'components/common/common';
import { VideoChatContainer } from 'components/video-chat/video-chat-container';
import { useAppForm } from 'hooks/hooks';
// import { Loader, UploadImage } from 'components/common/common';
// import { Icon } from 'components/common/icon';
// import { useState } from 'react';
import defaultPreview from '../../../assets/img/default/video-default.png';

import styles from './styles.module.scss';

const video = {
  previewImage: 'https://i3.ytimg.com/vi/EtjDLZKL1rc/maxresdefault.jpg',
  title: 'Test stream 12',
  description: 'Me testing stream!',
  streamingKey: 'testkey',
  videoId: 'teststream',
};

// type UpdateStreamRequestDto = {
//   title?: string,
//   description?: string,
// }

export interface StreamSettingsFormValues {
  streamingKey: string;
  streamingServerUrl: string;
  streamUrl: string;
  streamTitle: string;
  streamDescription: string;
}

const StudioStream: FC = () => {
  const { control, errors } = useAppForm<StreamSettingsFormValues>({
    defaultValues: {
      streamingKey: 'test',
      streamUrl: 'dev.streamlet.tk/video/testvideo',
      streamingServerUrl: 'rtmp://localhost:1935/live',
      streamTitle: 'test stream',
      streamDescription: 'hi its description',
    },
  });

  return (
    <div className={styles['settings-container']}>
      <div className={styles['settings-block']}>
        <div className={styles['col-1']}>
          <div className={styles['preview-container']}>
            <img className={styles['preview']} src={video.previewImage ?? defaultPreview} alt="Stream preview" />
            <button
              className={clsx(styles['button'], styles['preview-button'])}
              onClick={(): void => console.warn('click')}
            >
              Upload Preview
            </button>
          </div>
          <form className={styles['form-container']}>
            <div className={styles['streaming-key-container']}>
              <PasswordInput
                inputClassName={styles['input']}
                labelClassName={styles['label']}
                wrapperClassName={styles['form-input']}
                placeholder="Streaming key"
                control={control}
                name="streamingKey"
                errors={errors}
                label="Streaming key"
                isReadOnly
              />
              <button className={styles['button']} onClick={(): void => console.warn('click')}>
                Reset
              </button>
            </div>
            <Input
              inputClassName={styles['input']}
              labelClassName={styles['label']}
              wrapperClassName={styles['form-input']}
              placeholder="Streaming server URL"
              control={control}
              name="streamingServerUrl"
              errors={errors}
              label="Streaming server URL"
              isReadOnly
            />
            <Input
              inputClassName={styles['input']}
              labelClassName={styles['label']}
              wrapperClassName={styles['form-input']}
              placeholder="Stream URL"
              control={control}
              name="streamUrl"
              errors={errors}
              label="Stream URL"
              isReadOnly
            />
          </form>
        </div>
        <div className={styles['col-2']}>
          <form className={styles['form-container']}>
            <Input
              control={control}
              errors={errors}
              name="streamTitle"
              label="Title"
              type="text"
              inputClassName={styles['input']}
              inputErrorClassName={styles['input-error']}
              labelClassName={styles['label']}
              errorBlockClassName={styles['error']}
              wrapperClassName={styles['form-input']}
              placeholder="Title"
            />
            <Input
              control={control}
              errors={errors}
              name="streamDescription"
              label="Tags"
              type="text"
              inputClassName={styles['input']}
              inputErrorClassName={styles['input-error']}
              labelClassName={styles['label']}
              errorBlockClassName={styles['error']}
              wrapperClassName={styles['form-input']}
              placeholder="Stream description"
            />
            <Input
              control={control}
              errors={errors}
              name="streamDescription"
              label="Stream description"
              type="text"
              inputClassName={styles['input']}
              inputErrorClassName={styles['input-error']}
              labelClassName={styles['label']}
              errorBlockClassName={styles['error']}
              wrapperClassName={styles['form-input']}
              placeholder="Stream description"
            />

            <div className={styles['button-wrapper']}>
              <button
                className={clsx(styles['button'], styles['preview-button'])}
                onClick={(): void => console.warn('click')}
              >
                Save
              </button>
              <button
                className={clsx(styles['button'], styles['preview-button'])}
                onClick={(): void => console.warn('click')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <div className={styles['col-3']}>
          <VideoChatContainer />
        </div>
      </div>
    </div>
  );
};
export { StudioStream };

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
