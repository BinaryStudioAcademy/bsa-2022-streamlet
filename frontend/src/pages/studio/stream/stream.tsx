// import { IconColor, IconName } from 'common/enums/enums';
import clsx from 'clsx';
import { FC } from 'common/types/types';
import { Button, Input, PasswordInput } from 'components/common/common';
import { AreaInput } from 'components/common/input/area-input/area-input';
import { DatetimeInput } from 'components/common/input/datetime-input/datetime-input';
import { VideoChatContainer } from 'components/video-chat/video-chat-container';
import { useAppForm } from 'hooks/hooks';
// import { Loader, UploadImage } from 'components/common/common';
// import { Icon } from 'components/common/icon';
// import { useState } from 'react';
import defaultPreview from '../../../assets/img/default/video-default.png';

import styles from './styles.module.scss';

const video = {
  id: '90862886-dab4-4777-9b1d-62a0f541559e',
  previewImage: 'https://i3.ytimg.com/vi/jfKfPfyJRdk/maxresdefault.jpg',
  status: 'pending',
  isLive: false,
  title: 'Test stream 12',
  description: 'Me testing stream!',
  streamingKey: 'testkey',
  scheduledDate: new Date('2022-08-31T03:24:00'),
};

// type UpdateStreamRequestDto = {
//   title?: string,
//   description?: string,
// }

export interface StreamSettingsFormValues {
  streamingKey: string;
  streamingServerUrl: string;
  streamUrl: string;
  title: string;
  tags: string;
  category: string;
  description: string;
  scheduledDate: Date;
  isLive: boolean;
  privacy: string;
}

const StudioStream: FC = () => {
  const { control, errors } = useAppForm<StreamSettingsFormValues>({
    defaultValues: {
      streamingKey: '3400139d-e0fd-49ab-ac52-be4d72f9b10b',
      streamingServerUrl: 'rtmp://localhost:1935/live',
      streamUrl: `dev.streamlet.tk/video/${video.id}`,
      title: video.title,
      tags: '',
      category: '',
      description: video.description,
      scheduledDate: video.scheduledDate,
      isLive: video.isLive,
      privacy: 'public',
    },
  });

  return (
    <div className={styles['settings-container']}>
      <div className={styles['settings-block-container']}>
        <div className={styles['settings-block']}>
          <div className={styles['col-1']}>
            <div className={styles['preview-container']}>
              <img className={styles['preview']} src={video.previewImage ?? defaultPreview} alt="Stream preview" />
              <Button
                content={'Upload Preview'}
                className={styles['button']}
                onClick={(): void => console.warn('reset')}
              />
            </div>
            <form className={styles['form-container']}>
              <div className={styles['field-container']}>
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
                <Button content={'Reset'} className={styles['button']} onClick={(): void => console.warn('reset')} />
                <Button content={'Copy'} className={styles['button']} onClick={(): void => console.warn('copied')} />
              </div>
              <div className={styles['field-container']}>
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
                <Button content={'Copy'} className={styles['button']} onClick={(): void => console.warn('copied')} />
              </div>
              <div className={styles['field-container']}>
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
                <Button content={'Copy'} className={styles['button']} onClick={(): void => console.warn('copied')} />
              </div>
            </form>
          </div>
          <div className={styles['col-2']}>
            <form className={styles['form-container']}>
              <Input
                control={control}
                errors={errors}
                name="title"
                label="Title"
                type="text"
                inputClassName={styles['input']}
                inputErrorClassName={styles['input-error']}
                labelClassName={styles['label']}
                errorBlockClassName={styles['error']}
                wrapperClassName={styles['form-input']}
                placeholder="Your stream name..."
              />
              <div className={styles['input-row']}>
                <Input
                  control={control}
                  errors={errors}
                  name="category"
                  label="Category"
                  type="text"
                  inputClassName={styles['input']}
                  inputErrorClassName={styles['input-error']}
                  labelClassName={styles['label']}
                  errorBlockClassName={styles['error']}
                  wrapperClassName={styles['form-input']}
                  placeholder="Choose the category"
                />
                <Input
                  control={control}
                  errors={errors}
                  name="tags"
                  label="Tags"
                  type="text"
                  inputClassName={styles['input']}
                  inputErrorClassName={styles['input-error']}
                  labelClassName={styles['label']}
                  errorBlockClassName={styles['error']}
                  wrapperClassName={styles['form-input']}
                  placeholder="Separated by commas..."
                />
              </div>
              <div className={styles['input-row']}>
                <DatetimeInput
                  control={control}
                  name="scheduledDate"
                  label="Scheduled date"
                  inputClassName={styles['input']}
                  labelClassName={styles['label']}
                  wrapperClassName={styles['form-input']}
                  defaultValue={video.scheduledDate}
                />
                <Input
                  control={control}
                  errors={errors}
                  name="privacy"
                  label="Privacy"
                  type="text"
                  inputClassName={styles['input']}
                  inputErrorClassName={styles['input-error']}
                  labelClassName={styles['label']}
                  errorBlockClassName={styles['error']}
                  wrapperClassName={styles['form-input']}
                  placeholder="Select privacy settings"
                />
              </div>

              <AreaInput
                control={control}
                name="description"
                label="Stream description"
                inputClassName={styles['area']}
                labelClassName={styles['label']}
                wrapperClassName={styles['form-input']}
                placeholder="Stream description..."
              />

              <div className={styles['button-wrapper']}>
                <Button
                  content={'Save'}
                  className={clsx(styles['button'], styles['preview-button'])}
                  onClick={(): void => console.warn('copied')}
                />
                <Button
                  content={'Cancel'}
                  className={clsx(styles['button'], styles['preview-button'])}
                  onClick={(): void => console.warn('copied')}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={styles['chat-container']}>
        <VideoChatContainer />
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
