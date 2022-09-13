import clsx from 'clsx';
import { FC, FormControl, SelectOptions, VideoStreamResponseDto } from 'common/types/types';
import { Button, Input, Loader, PasswordInput, ToggleSwitch } from 'components/common/common';
import { ChatSetting, VideoChatContainer } from 'components/video-chat/video-chat-container';
import CopyToClipboard from 'react-copy-to-clipboard';
import { DeepRequired, FieldErrorsImpl, FieldValues, UseFormGetValues } from 'react-hook-form';
import { StreamStatus } from 'shared/build';
import { StreamInfoFormValues } from './common/stream-info-form-values';
import { StreamPrivacyLabel, ChatStyle } from 'common/enums/enums';
import { STREAM_PRIVACY_OPTIONS } from 'common/constants/stream/stream';
import ReactSelect, { MultiValue } from 'react-select';

import styles from './styles.module.scss';
import { customSelectStyles } from '../common/stream-settings-modal/stream-settings-forms/custom-select-styles';
import { VideoPlayer } from 'components/common/video-player/video-player';

type Props = {
  handleSettingsModalOpen(): void;
  handleChangeStreamStatus(): void;
  handleCopy(): void;
  handleStreamingKeyReset(): void;
  stream: VideoStreamResponseDto | null;
  infoFormControl: FormControl<StreamInfoFormValues>;
  infoFormErrors: FieldErrorsImpl<DeepRequired<FieldValues>>;
  infoFormValues: UseFormGetValues<StreamInfoFormValues>;
  onStreamPrivacyChange(newValue: MultiValue<SelectOptions>): void;
  onStreamChatToggleChange(): void;
};

const StudioStream: FC<Props> = ({
  handleSettingsModalOpen,
  handleChangeStreamStatus,
  handleCopy,
  handleStreamingKeyReset,
  stream,
  infoFormControl,
  infoFormErrors,
  infoFormValues,
  onStreamPrivacyChange,
  onStreamChatToggleChange,
}) => {
  const chatSettings: ChatSetting = {
    hideSetting: false,
  };

  return (
    <div className={styles['settings-container']}>
      <div className={styles['settings-block-container']}>
        <div className={styles['settings-block']}>
          <div className={styles['col-1']}>
            <div className={styles['preview-container']}>
              <div className={styles['preview']} />
              {stream?.isReadyToStream ? (
                <VideoPlayer url={stream?.videoPath ?? ''} />
              ) : (
                <Loader color="white" spinnerSize="40" />
              )}
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
                <div className={clsx(styles['status-indicator'], stream?.isReadyToStream && styles['live'])} />
                <p className={styles['status-text']}>{!stream?.isReadyToStream ? 'Not connected' : 'Connected'}</p>
              </div>
              <Button
                content={
                  stream?.status === StreamStatus.WAITING
                    ? 'Go live'
                    : StreamStatus.LIVE
                    ? 'End stream'
                    : 'Disconnected'
                }
                className={clsx(styles['button'], styles['padding-button'], styles['live-button'])}
                onClick={handleChangeStreamStatus}
                disabled={
                  (!stream?.isReadyToStream && stream?.status === StreamStatus.WAITING) ||
                  stream?.status === StreamStatus.FINISHED
                }
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
                  {stream?.categories.length ? stream?.categories.map((category) => category.name).join(', ') : '-'}
                </p>
              </div>
              <div className={styles['text-field-container']}>
                <p className={styles['field-caption']}>Tags</p>
                <p className={styles['field-value']}>
                  {stream?.tags.length ? stream?.tags.map((tag) => tag.name).join(', ') : '-'}
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
                  onClick={handleSettingsModalOpen}
                  type="button"
                />
              </div>
              <div className={styles['text-field-container']}>
                <label className={styles['label']}>Stream privacy</label>
                <ReactSelect
                  options={STREAM_PRIVACY_OPTIONS}
                  defaultValue={
                    {
                      value: stream?.privacy ?? '',
                      label: STREAM_PRIVACY_OPTIONS.find((opt) => opt.value === stream?.privacy)?.label ?? '',
                    } ?? STREAM_PRIVACY_OPTIONS[1]
                  }
                  onChange={onStreamPrivacyChange}
                  styles={customSelectStyles}
                />
              </div>
              <div>
                <label className={styles['label']}>Stream chat</label>
                <div className={styles['toggle-wrap']}>
                  <ToggleSwitch defaultValue={stream?.isChatEnabled ?? true} onToggle={onStreamChatToggleChange} />
                  <span className={styles['label-right']}>{stream?.isChatEnabled ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['chat-container']}>
        <VideoChatContainer videoId={stream?.id ?? ''} chatSettings={chatSettings} chatStyle={ChatStyle.GREEN} />
      </div>
    </div>
  );
};
export { StudioStream };
