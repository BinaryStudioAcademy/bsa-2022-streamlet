// import { IconColor, IconName } from 'common/enums/enums';
import clsx from 'clsx';
import {
  FC,
  FormControl,
  StreamPosterUploadRequestDto,
  StreamUpdateRequestDto,
  VideoStreamResponseDto,
} from 'common/types/types';
import { Button, Input, PasswordInput } from 'components/common/common';
import { AreaInput } from 'components/common/input/area-input/area-input';
import { DatetimeInput } from 'components/common/input/datetime-input/datetime-input';
import { VideoChatContainer } from 'components/video-chat/video-chat-container';
import CopyToClipboard from 'react-copy-to-clipboard';
import { DeepRequired, FieldErrorsImpl, FieldValues, UseFormGetValues, UseFormHandleSubmit } from 'react-hook-form';
import { StreamStatus } from 'shared/build';
// import { Loader, UploadImage } from 'components/common/common';
// import { Icon } from 'components/common/icon';
import defaultPreview from '../../../assets/img/default/video-default.png';
import { StreamInfoFormValues, StreamSettingsFormValues } from './common/stream-settings-form-values';

import styles from './styles.module.scss';

type Props = {
  isEditingForm: boolean;
  handleFormEdit(): void;
  handleFormSave(payload: StreamUpdateRequestDto): void;
  handleFormCancel(): void;
  handleChangeStreamStatus(): void;
  handleCopy(): void;
  handleStreamingKeyReset(): void;
  handleUploadPoster(payload: StreamPosterUploadRequestDto): void;
  stream: VideoStreamResponseDto | null;
  infoFormControl: FormControl<StreamInfoFormValues>;
  infoFormErrors: FieldErrorsImpl<DeepRequired<FieldValues>>;
  infoFormValues: UseFormGetValues<StreamInfoFormValues>;
  settingsFormControl: FormControl<StreamSettingsFormValues>;
  settingsFormErrors: FieldErrorsImpl<DeepRequired<FieldValues>>;
  settingsFormHandleSubmit: UseFormHandleSubmit<StreamSettingsFormValues>;
  onSubmit(submitValue: StreamSettingsFormValues): void;
};

const StudioStream: FC<Props> = ({
  isEditingForm,
  handleFormEdit,
  handleFormCancel,
  handleChangeStreamStatus,
  handleCopy,
  handleStreamingKeyReset,
  handleUploadPoster,
  stream,
  infoFormControl,
  infoFormErrors,
  infoFormValues,
  settingsFormControl,
  settingsFormErrors,
  settingsFormHandleSubmit,
  onSubmit,
}) => {
  return (
    <div className={styles['settings-container']}>
      <div className={styles['settings-block-container']}>
        <div className={styles['settings-block']}>
          <div className={styles['col-1']}>
            <div className={styles['preview-container']}>
              <img className={styles['preview']} src={stream?.poster ?? defaultPreview} alt="Stream preview" />
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
                  control={infoFormControl}
                  name="streamingKey"
                  errors={infoFormErrors}
                  label="Streaming key"
                  readOnly
                />
                <Button content={'Reset'} className={styles['button']} onClick={handleStreamingKeyReset} />
                <CopyToClipboard onCopy={handleCopy} text={infoFormValues('streamingKey')}>
                  <Button content={'Copy'} className={styles['button']} />
                </CopyToClipboard>
              </div>
              <div className={styles['field-container']}>
                <Input
                  inputClassName={styles['input']}
                  labelClassName={styles['label']}
                  wrapperClassName={styles['form-input']}
                  placeholder="Streaming server URL"
                  control={infoFormControl}
                  name="streamingServerUrl"
                  errors={infoFormErrors}
                  label="Streaming server URL"
                  readOnly
                />
                <CopyToClipboard onCopy={handleCopy} text={infoFormValues('streamingServerUrl')}>
                  <Button content={'Copy'} className={styles['button']} />
                </CopyToClipboard>
              </div>
              <div className={styles['field-container']}>
                <Input
                  inputClassName={styles['input']}
                  labelClassName={styles['label']}
                  wrapperClassName={styles['form-input']}
                  placeholder="Stream URL"
                  control={infoFormControl}
                  name="streamUrl"
                  errors={infoFormErrors}
                  label="Stream URL"
                  readOnly
                />
                <CopyToClipboard onCopy={handleCopy} text={infoFormValues('streamUrl')}>
                  <Button content={'Copy'} className={styles['button']} />
                </CopyToClipboard>
              </div>
            </form>
          </div>
          <div className={styles['col-2']}>
            <div className={styles['status-container']}>
              <div className={styles['status']}>
                <div
                  className={clsx(styles['status-indicator'], stream?.status === StreamStatus.LIVE && styles['live'])}
                />
                <p className={styles['status-text']}>
                  {!stream?.isReadyToStream
                    ? 'Not connected'
                    : stream?.status === StreamStatus.WAITING
                    ? 'Ready to stream'
                    : stream?.status === StreamStatus.LIVE
                    ? 'Live'
                    : 'Offline'}
                </p>
              </div>
              <Button
                content={stream?.status === StreamStatus.WAITING ? 'Go live' : 'End stream'}
                className={clsx(styles['button'], styles['preview-button'], styles['live-button'])}
                onClick={handleChangeStreamStatus}
                disabled={!stream?.isReadyToStream}
              />
            </div>
            <form className={styles['form-container']} onSubmit={settingsFormHandleSubmit(onSubmit)}>
              <Input
                control={settingsFormControl}
                errors={settingsFormErrors}
                name="name"
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
                  control={settingsFormControl}
                  errors={settingsFormErrors}
                  name="categories"
                  label="Categories"
                  type="text"
                  inputClassName={styles['input']}
                  inputErrorClassName={styles['input-error']}
                  labelClassName={styles['label']}
                  errorBlockClassName={styles['error']}
                  wrapperClassName={styles['form-input']}
                  placeholder="Choose the categories"
                  disabled={!isEditingForm}
                />
                <Input
                  control={settingsFormControl}
                  errors={settingsFormErrors}
                  name="tags"
                  label="Tags"
                  type="text"
                  inputClassName={styles['input']}
                  inputErrorClassName={styles['input-error']}
                  labelClassName={styles['label']}
                  errorBlockClassName={styles['error']}
                  wrapperClassName={styles['form-input']}
                  placeholder="Press enter to add tags..."
                  disabled={!isEditingForm}
                />
              </div>
              <div className={styles['input-row']}>
                <DatetimeInput
                  control={settingsFormControl}
                  name="scheduledStreamDate"
                  label="Scheduled date"
                  inputClassName={styles['input']}
                  labelClassName={styles['label']}
                  wrapperClassName={styles['form-input']}
                  defaultValue={new Date()}
                  disabled={!isEditingForm}
                />
                <Input
                  control={settingsFormControl}
                  errors={settingsFormErrors}
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
                control={settingsFormControl}
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
                    type="button"
                  />
                ) : (
                  <>
                    <Button
                      content={'Save'}
                      className={clsx(styles['button'], styles['preview-button'])}
                      type="submit"
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
        <VideoChatContainer videoId={stream?.id} />
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
