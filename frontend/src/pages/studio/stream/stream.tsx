import clsx from 'clsx';
import {
  FC,
  FormControl,
  StreamPosterUploadRequestDto,
  StreamUpdateRequestDto,
  VideoStreamResponseDto,
} from 'common/types/types';
import { Button, Input, PasswordInput } from 'components/common/common';
import { VideoChatContainer } from 'components/video-chat/video-chat-container';
import CopyToClipboard from 'react-copy-to-clipboard';
import { DeepRequired, FieldErrorsImpl, FieldValues, UseFormGetValues, UseFormHandleSubmit } from 'react-hook-form';
import { StreamStatus } from 'shared/build';
// import defaultPreview from 'assets/img/default/video-default.png';
import { StreamInfoFormValues, StreamSettingsFormValues } from './common/stream-settings-form-values';

import styles from './styles.module.scss';
import { StreamPrivacyLabel } from 'common/enums/enums';

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
  handleFormEdit,
  handleChangeStreamStatus,
  handleCopy,
  handleStreamingKeyReset,
  stream,
  infoFormControl,
  infoFormErrors,
  infoFormValues,
}) => {
  return (
    <div className={styles['settings-container']}>
      <div className={styles['settings-block-container']}>
        <div className={styles['settings-block']}>
          <div className={styles['col-1']}>
            <div className={styles['preview-container']}>
              <div className={styles['preview']} />

              {/* <img
                className={styles['preview']}
                src={stream?.poster ? stream?.poster : defaultPreview}
                alt="Stream preview"
              /> */}
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
                <p className={styles['status-text']}>{!stream?.isReadyToStream ? 'Not connected' : 'Connected'}</p>
              </div>
              <Button
                content={stream?.status === StreamStatus.WAITING ? 'Go live' : 'End stream'}
                className={clsx(styles['button'], styles['padding-button'], styles['live-button'])}
                onClick={handleChangeStreamStatus}
                disabled={!stream?.isReadyToStream}
              />
            </div>
            <div className={styles['stream-details']}>
              <div className={styles['text-field-container']}>
                <p className={styles['field-caption']}>Title</p>
                <p className={styles['field-value']}>{stream?.name}</p>
              </div>
              <div className={styles['text-field-container']}>
                <p className={styles['field-caption']}>Privacy</p>
                <p className={styles['field-value']}>{StreamPrivacyLabel[stream?.privacy ?? 'PUBLIC']}</p>
              </div>
              <div className={styles['text-field-container']}>
                <p className={styles['field-caption']}>Categories</p>
                <p className={styles['field-value']}>
                  {stream?.categories ? stream?.categories.map((category) => category.name).join(', ') : '-'}
                </p>
              </div>
              <div className={styles['text-field-container']}>
                <p className={styles['field-caption']}>Tags</p>
                <p className={styles['field-value']}>
                  {stream?.tags ? stream?.tags.map((tag) => tag.name).join(', ') : '-'}
                </p>
              </div>
              <div className={styles['text-field-container']}>
                <p className={styles['field-caption']}>Description</p>
                <p className={clsx(styles['field-value'], styles['field-value-description'])}>
                  {stream?.description ? stream.description : '-'}
                </p>
              </div>

              <div className={styles['button-wrapper']}>
                <Button
                  content={'Edit'}
                  className={clsx(styles['button'], styles['padding-button'], styles['stream-edit'])}
                  onClick={handleFormEdit}
                  type="button"
                />
              </div>
            </div>
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
