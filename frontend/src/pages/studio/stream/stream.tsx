// import { IconColor, IconName } from 'common/enums/enums';
import clsx from 'clsx';
import { IconName } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button, createToastNotification, Input, PasswordInput } from 'components/common/common';
import { AreaInput } from 'components/common/input/area-input/area-input';
import { DatetimeInput } from 'components/common/input/datetime-input/datetime-input';
import { VideoChatContainer } from 'components/video-chat/video-chat-container';
import { useAppForm, useState } from 'hooks/hooks';
import CopyToClipboard from 'react-copy-to-clipboard';
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
  isReadyToStream: false,
  title: 'Test stream 12',
  description: 'Me testing stream!',
  streamingKey: 'testkey',
  scheduledDate: new Date('2022-08-31T03:24:00'),
};

const streamingKey = '3400139d-e0fd-49ab-ac52-be4d72f9b10b';
const streamUrl = `dev.streamlet.tk/video/${video.id}`;
const streamingServerUrl = 'rtmp://localhost:1935/live';

export type StreamSettingsFormValues = {
  streamingKey: string;
  streamingServerUrl: string;
  streamUrl: string;
  title: string;
  tags: string;
  category: string;
  description: string;
  scheduledDate: Date;
  isLive: boolean;
  isReadyToStream: boolean;
  privacy: string;
};

const StudioStream: FC = () => {
  const { control, errors } = useAppForm<StreamSettingsFormValues>({
    defaultValues: {
      streamingKey: streamingKey,
      streamingServerUrl: streamingServerUrl,
      streamUrl: streamUrl,
      title: video.title,
      tags: '',
      category: '',
      description: video.description,
      scheduledDate: video.scheduledDate,
      isLive: video.isLive,
      isReadyToStream: video.isReadyToStream,
      privacy: 'public',
    },
  });

  const [isEditingForm, setIsEditingForm] = useState(false);

  const handleFormEdit = (): void => {
    setIsEditingForm(true);
  };

  const handleFormSave = (): void => {
    console.warn('saved');
  };

  const handleFormCancel = (): void => {
    setIsEditingForm(false);
  };

  const handleChangeStreamStatus = (): void => {
    console.warn('streaming changed');
  };

  const handleCopy = (): void => {
    createToastNotification({
      type: 'success',
      message: 'Copied!',
      iconName: IconName.INFO,
      title: '',
    });
  };

  const handleKeyReset = (): void => {
    console.warn('reset');
  };

  const handleUploadPoster = (): void => {
    console.warn('upload');
  };

  return (
    <div className={styles['settings-container']}>
      <div className={styles['settings-block-container']}>
        <div className={styles['settings-block']}>
          <div className={styles['col-1']}>
            <div className={styles['preview-container']}>
              <img className={styles['preview']} src={video.previewImage ?? defaultPreview} alt="Stream preview" />
              <Button content={'Upload Preview'} className={styles['button']} onClick={handleUploadPoster} />
            </div>
            <form className={styles['form-container']}>
              <div className={styles['field-container']}>
                <PasswordInput
                  inputClassName={styles['input']}
                  changeVisibilityBtnClassName={styles['input-eye']}
                  labelClassName={styles['label']}
                  wrapperClassName={styles['form-input']}
                  placeholder="Streaming key"
                  control={control}
                  name="streamingKey"
                  errors={errors}
                  label="Streaming key"
                  readOnly
                />
                <Button content={'Reset'} className={styles['button']} onClick={handleKeyReset} />
                <CopyToClipboard onCopy={handleCopy} text={streamingKey}>
                  <Button content={'Copy'} className={styles['button']} />
                </CopyToClipboard>
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
                  readOnly
                />
                <CopyToClipboard onCopy={handleCopy} text={streamingServerUrl}>
                  <Button content={'Copy'} className={styles['button']} />
                </CopyToClipboard>
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
                  readOnly
                />
                <CopyToClipboard onCopy={handleCopy} text={streamUrl}>
                  <Button content={'Copy'} className={styles['button']} />
                </CopyToClipboard>
              </div>
            </form>
          </div>
          <div className={styles['col-2']}>
            <div className={styles['status-container']}>
              <div className={styles['status']}>
                <div className={clsx(styles['status-indicator'], video.isLive && styles['live'])} />
                <p className={styles['status-text']}>
                  {video.isLive ? 'Live' : video.isReadyToStream ? 'Ready to stream' : 'Not connected'}
                </p>
              </div>
              <Button
                content={video.isLive ? 'End stream' : 'Go live'}
                className={clsx(styles['button'], styles['preview-button'], styles['live-button'])}
                onClick={handleChangeStreamStatus}
                disabled={!video.isReadyToStream}
              />
            </div>
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
                disabled={!isEditingForm}
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
                  disabled={!isEditingForm}
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
                  placeholder="Press enter to add tag..."
                  disabled={!isEditingForm}
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
                  disabled={!isEditingForm}
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
                  disabled={!isEditingForm}
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
                disabled={!isEditingForm}
              />

              <div className={styles['button-wrapper']}>
                {!isEditingForm ? (
                  <Button
                    content={'Edit'}
                    className={clsx(styles['button'], styles['preview-button'])}
                    onClick={handleFormEdit}
                  />
                ) : (
                  <>
                    <Button
                      content={'Save'}
                      className={clsx(styles['button'], styles['preview-button'])}
                      onClick={handleFormSave}
                    />
                    <Button
                      content={'Cancel'}
                      className={clsx(styles['button'], styles['preview-button'])}
                      onClick={handleFormCancel}
                    />
                  </>
                )}
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
