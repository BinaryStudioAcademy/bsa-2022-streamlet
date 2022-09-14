import clsx from 'clsx';
import { FC, FormControl } from 'common/types/types';
import { Button, Input, Loader, PasswordInput } from 'components/common/common';
import { ChatSetting, VideoChatContainer } from 'components/video-chat/video-chat-container';
import CopyToClipboard from 'react-copy-to-clipboard';
import { DeepRequired, FieldErrorsImpl, FieldValues, UseFormGetValues } from 'react-hook-form';
import { StreamStatus } from 'shared/build';
import { StreamInfoFormValues } from '../common/stream-info-form-values';
import { ChatStyle } from 'common/enums/enums';

import styles from './styles.module.scss';
import { VideoPlayer } from 'components/common/video-player/video-player';
import { useAppSelector } from 'hooks/hooks';
import { ChatToggle } from './chat-toggle';
import { CategoriesDisplay } from './categories-display';
import { PrivacyDisplay } from './privacy-display';
import { PrivacySelector } from './privacy-selector';

type Props = {
  handleSettingsModalOpen(): void;
  handleChangeStreamStatus(): void;
  handleCopy(): void;
  handleStreamingKeyReset(): void;
  infoFormControl: FormControl<StreamInfoFormValues>;
  infoFormErrors: FieldErrorsImpl<DeepRequired<FieldValues>>;
  infoFormValues: UseFormGetValues<StreamInfoFormValues>;
};

const StudioStream: FC<Props> = ({
  handleSettingsModalOpen,
  handleChangeStreamStatus,
  handleCopy,
  handleStreamingKeyReset,
  infoFormControl,
  infoFormErrors,
  infoFormValues,
}) => {
  const chatSettings: ChatSetting = {
    hideSetting: false,
  };

  const streamReadiness = useAppSelector((state) => state.stream.stream?.isReadyToStream);
  const streamVideoPath = useAppSelector((state) => state.stream.stream?.videoPath);
  const streamStatus = useAppSelector((state) => state.stream.stream?.status);
  const streamId = useAppSelector((state) => state.stream.stream?.id);
  const streamDesc = useAppSelector((state) => state.stream.stream?.description);
  const streamName = useAppSelector((state) => state.stream.stream?.name);
  const streamTags = useAppSelector((state) => state.stream.stream?.tags);

  return (
    <div className={styles['settings-container']}>
      <div className={styles['settings-block-container']}>
        <div className={styles['settings-block']}>
          <div className={styles['col-1']}>
            <div className={styles['preview-container']}>
              {streamReadiness ? (
                <VideoPlayer
                  url={streamVideoPath ?? ''}
                  sizingProps={{ height: '100%', width: '100%' }}
                  isLive
                  mute
                  maxControlsShadowHeight="200px"
                  showControls={true}
                />
              ) : (
                <Loader color="white" spinnerSize="40px" hCentered vCentered />
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
                <div className={clsx(styles['status-indicator'], streamReadiness && styles['live'])} />
                <p className={styles['status-text']}>{!streamReadiness ? 'Not connected' : 'Connected'}</p>
              </div>
              <Button
                content={
                  streamStatus === StreamStatus.WAITING ? 'Go live' : StreamStatus.LIVE ? 'End stream' : 'Disconnected'
                }
                className={clsx(styles['button'], styles['padding-button'], styles['live-button'])}
                onClick={handleChangeStreamStatus}
                disabled={
                  (!streamReadiness && streamStatus === StreamStatus.WAITING) || streamStatus === StreamStatus.FINISHED
                }
              />
            </div>
            <div className={styles['stream-details']}>
              <div className={styles['first-line']}>
                <div className={styles['text-field-container']}>
                  <p className={styles['field-caption']}>Title:</p>
                  <p className={styles['field-value']}>{streamName}</p>
                </div>
                <Button
                  content={'Edit'}
                  className={clsx(styles['button'], styles['padding-button'], styles['stream-edit'])}
                  onClick={handleSettingsModalOpen}
                  type="button"
                />
              </div>
              <PrivacyDisplay />
              <CategoriesDisplay />
              <div className={styles['text-field-container']}>
                <p className={styles['field-caption']}>Tags:</p>
                <p className={styles['field-value']}>
                  {streamTags?.length ? streamTags.map((tag) => tag.name).join(', ') : '-'}
                </p>
              </div>
              <div className={styles['text-field-container']}>
                <p className={styles['field-caption']}>Description:</p>
                <p className={clsx(styles['field-value'], styles['field-value-description'])}>
                  {streamDesc ? streamDesc : '-'}
                </p>
              </div>
              <PrivacySelector />
              <ChatToggle />
            </div>
          </div>
        </div>
      </div>
      <div className={styles['chat-container']}>
        <VideoChatContainer videoId={streamId ?? ''} chatSettings={chatSettings} chatStyle={ChatStyle.GREEN} />
      </div>
    </div>
  );
};
export { StudioStream };
